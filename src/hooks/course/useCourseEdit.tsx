// src/hooks/course/useCourseEdit.ts
import { useMutation } from "@tanstack/react-query";
import { editCourse } from "@/api/course";
import { EditCourseRequest } from "@/types/course";

export function useCourseEdit() {
    return useMutation({
        mutationFn: ({ courseId, data }: { courseId: number; data: EditCourseRequest }) =>
            editCourse(courseId, data),
    });
}

