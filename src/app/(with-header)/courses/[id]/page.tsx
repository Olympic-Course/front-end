import CourseDetailPageClient from "./CourseDetailPageClient";

export default function Page({ params }: { params: { id: string } }) {
  const courseId = Number(params.id);
  return <CourseDetailPageClient courseId={courseId} />;
}