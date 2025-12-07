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
import { useCourseDetailGet } from "@/hooks/course/useCourseDetailGet";
import ViewCourseKakaoMap from "@/components/map/ViewCourseKakaoMap";
import { DurationOptions } from "@/constants/durationOptions";
import { CostOptions } from "@/constants/costOptions";
import { Tags } from "@/constants/tags";

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const courseId = Number(params.id);

  // API 호출
  const { data, isLoading, error } = useCourseDetailGet(courseId);
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);

  const [showCourseMemoModal, setShowCourseMemoModal] = useState(false);

  // API data가 들어오면 상태 업데이트
  useEffect(() => {
    if (data) {
      setCourseData(data.data); // API 응답 구조: data.data
    }
  }, [data]);

  // courseData가 준비될 때 메모 리스트 초기화
  const [memoActiveList, setMemoActiveList] = useState<boolean[]>([]);

  useEffect(() => {
    if (courseData) {
      setMemoActiveList(Array(courseData.steps.length).fill(false));
    }
  }, [courseData]);


  if (isLoading || !courseData) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-400"></div>
        <span className="mt-3 text-gray-400">불러오는 중...</span>
      </div>
    );
  }

  if (error) return <div>에러 발생</div>;


  const toggleMemoActive = (index: number) => {
    setMemoActiveList(prev =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  const getDurationLabel = (key: string) => {
    return DurationOptions.find(d => d.key === key)?.label ?? key;
  };

  const getCostLabel = (key: string) => {
    return CostOptions.find(c => c.key === key)?.label ?? key;
  };

  const normalizePhotos = (photos: { path: string }[]) => {
    return photos.map(p => p.path);
  };

  return (
    <HeaderLayout title={""}>
      <div className="flex flex-col h-full px-10 pb-5 justify-start gap-2">
        {/* 수정 및 삭제 버튼 영역 */}
        {courseData.isAuthor && (
          <div className="flex justify-end gap-3 items-center">
            <CourseActionButtons type={"edit"} />
            <CourseActionButtons type={"delete"} />
          </div>
        )}

        {/* 코스 타이틀 및 좋아요 버튼 영역 */}
        <div className="w-full flex justify-between items-start gap-3">
          <h1 className="text-xl font-bold">{courseData.title}</h1>
          <LikeIcon liked={courseData.liked} count={courseData.likeNum} />
        </div>

        {/* 태그 영역 */}
        <div className="flex gap-1.5 w-full">
          {courseData.tag.map((item, index) => {
            const tagLabel = Tags.find(t => t.key === item)?.label ?? item;

            return <Tag key={index} label={tagLabel} />;
          })}
        </div>

        {/* 코스 정보 영역 */}
        <div className="flex flex-col gap-0.5 w-full">
          <CourseInfoSummary label={"작성자"} info={courseData.writer} />
          <CourseInfoSummary
            label={"소요시간"}
            info={getDurationLabel(courseData.duration)}
          />

          <CourseInfoSummary
            label={"소요금액"}
            info={getCostLabel(courseData.cost)}
          />
        </div>

        {/* 코스 소개 내용 영역 */}
        <div className="w-full">
          <p className="text-sm text- font-semibold whitespace-pre-wrap leading-5 my-2">
            {courseData.comment}
          </p>
        </div>

        {/* 지도 영역 */}
        <div className="w-full h-60">
          <ViewCourseKakaoMap Steps={courseData.steps} />
        </div>

        {/* 코스 영역 */}
        <div className="flex flex-col w-full gap-2 mt-2 mb-4">
          {courseData.steps.map((step, index) => (
            <CourseSection
              key={step.stepId}
              type={"detail"}
              stepOrder={step.stepOrder}
              name={step.name}
              memoActive={memoActiveList[index]}
              onClick={() => toggleMemoActive(index)}
              description={step.descriptionKo ?? ""}
              photos={normalizePhotos(step.photos)}
              thumbnail={courseData.thumbnail}
              onSelectThumbnail={() => { }}
            />
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
