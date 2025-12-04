"use client"

import CourseActionButtons from "@/components/common/CourseActionButtons";
import HeaderLayout from "@/components/common/HeaderLayout";
import coursePost from "@/mock/coursePost.json"
import { useEffect, useState } from "react";
import { CourseDetail } from "@/types/course";
import LikeIcon from "@/components/common/LikeIcon";
import Tag from "@/components/common/Tag";
import CourseInfoSummary from "@/components/course/CourseInfoSummary";
import KakaoMap from "@/components/map/KakaoMap";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import CourseMemoModal from "@/components/course/modal/CourseMemoModal";
import CourseSection from "@/components/course/CourseSection";

export default function Page() {
  const router = useRouter();

  const [courseData, setCourseData] = useState<CourseDetail>(coursePost as CourseDetail);
  const [memoActiveList, setMemoActiveList] = useState<boolean[]>(
    Array(courseData.steps.length).fill(false)
  );
  const [showCourseMemoModal, setShowCourseMemoModal] = useState(false);

  const toggleMemoActive = (index: number) => {
    setMemoActiveList(prev =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  // useEffect(() => {
  //   // API.get("/course/2")
  //   setCourseData(coursePost as CourseDetail);
  // }, []);

  return (
    <HeaderLayout title={""}>
      <div className="flex flex-col h-full px-10 pb-5 justify-start gap-2">
        {/* 수정 및 삭제 버튼 영역 */}
        <div className="flex justify-end gap-3 items-center">
          <CourseActionButtons type={"edit"} />
          <CourseActionButtons type={"delete"} />
        </div>

        {/* 코스 타이틀 및 좋아요 버튼 영역 */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-bold">{courseData.title}</h1>
          <LikeIcon liked={courseData.liked} count={courseData.likeNum} />
        </div>

        {/* 태그 영역 */}
        <div className="flex gap-1.5 w-full">
          {courseData.tag.map((item, index) => (
            <Tag key={index} label={item} />
          ))}
        </div>

        {/* 코스 정보 영역 */}
        <div className="flex flex-col gap-0.5 w-full">
          <CourseInfoSummary label={"작성자"} info={courseData.writer} />
          <CourseInfoSummary label={"소요시간"} info={courseData.duration} />
          <CourseInfoSummary label={"소요금액"} info={courseData.cost} />
        </div>

        {/* 코스 소개 내용 영역 */}
        <div className="w-full">
          <p className="text-sm text- font-semibold whitespace-pre-wrap leading-5 my-2">
            {courseData.comment}
          </p>
        </div>

        {/* 지도 영역 */}
        <div className="w-full h-60">
          <KakaoMap />
        </div>

        {/* 코스 영역 */}
        <div className="flex flex-col w-full gap-2 my-2">
          {courseData.steps.map((step, index) => (
            <CourseSection
              key={step.stepId}
              stepOrder={step.stepOrder}
              name={step.name}
              memoActive={memoActiveList[index]}
              onClick={() => toggleMemoActive(index)} description={""} photos={[]} thumbnail={null} onSelectThumbnail={function (photoUrl: string): void {
                throw new Error("Function not implemented.");
              } }            />
          ))}
        </div>

        {/* 코스 시작하기 버튼 */}
        <PrimaryButton
          onClick={() => setShowCourseMemoModal(true)}
          label={"코스 시작하기"}
        />
      </div>

      {showCourseMemoModal && (
        <Modal
          title="장소별 메모 작성"
          onClose={() => setShowCourseMemoModal(false)}
        >
          <CourseMemoModal
            courseSteps={courseData.steps}
            buttonLabel="코스 시작하기"
            buttonClick={() => router.push(`/map/navigation/${courseData.courseId}`)}
          />
        </Modal>
      )}
    </HeaderLayout>
  )
}
