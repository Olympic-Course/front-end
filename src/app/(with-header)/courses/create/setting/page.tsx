import HeaderLayout from "@/components/common/HeaderLayout";
import MenuSection from "@/components/common/MenuSection";
import EditCourseLocationItem from "@/components/course/EditCourseLocationItem";
import EditCourseSection from "@/components/course/EditCourseSection";
import SelectedLocationItem from "@/components/course/SelectedLocationItem";

export default function Page() {
    return (
        <HeaderLayout title={"장소 추가하기"}>
            <div className="flex flex-col px-5 pt-3 pb-14 justify-start items-center gap-5">
                <MenuSection title={"선택된 장소"}>
                    <SelectedLocationItem locationIcon={"/icons/CONVENIENCE.svg"} name={"포메인"} />
                </MenuSection>
                <MenuSection title={"추가된 장소"}>
                    <EditCourseSection/>
                </MenuSection>
            </div>
        </HeaderLayout>
    );
}