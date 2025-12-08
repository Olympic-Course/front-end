import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStep {
  stepId: number;
  stepOrder: number;
  name: string;
  latitude: number;
  longitude: number;
  memo: string;
}

interface CourseNavigationState {
  userCourseId: number | null;
  userSteps: UserStep[];

  setNavigationData: (params: {
    userCourseId: number;
    userSteps: UserStep[];
  }) => void;

  clearNavigationData: () => void;
}

export const useCourseNavigationStore = create<CourseNavigationState>()(
  persist(
    (set) => ({
      userCourseId: null,
      userSteps: [],

      setNavigationData: ({ userCourseId, userSteps }) =>
        set({ userCourseId, userSteps }),

      clearNavigationData: () => set({ userCourseId: null, userSteps: [] }),
    }),
    {
      name: "course-navigation-store", // 로컬스토리지 key 이름
    }
  )
);
