// src/store/courseCreateStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 코스 스텝 타입
export interface CourseStep {
  stepOrder: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  photos: string[];
  previewPhotos: string[];
}

interface CourseCreateState {
  // 기본 정보
  title: string;
  description: string;
  thumbnail: string | null;
  duration: string;
  cost: string;
  secret: boolean;

  // 태그 (enum key 배열: ["ALONE", "COLD", "ON_FOOT"] 같은 형태)
  tags: string[];

  // 코스 스텝
  steps: CourseStep[];

  // Actions
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setThumbnail: (url: string | null) => void;
  setDuration: (duration: string) => void;
  setCost: (cost: string) => void;
  toggleSecretMode: () => void;

  // Tag actions
  setTags: (tags: string[]) => void;
  toggleTag: (tagKey: string) => void;

  // Step 관리
  addStep: (step: Omit<CourseStep, "stepOrder">) => void;
  updateStep: (order: number, data: Partial<CourseStep>) => void;
  deleteStep: (order: number) => void;
  setSteps: (steps: CourseStep[]) => void;

  // 초기화
  clearAll: () => void;
}

export const useCourseCreateStore = create<CourseCreateState>()(
  persist(
    (set, get) => ({
      title: "",
      description: "",
      thumbnail: null,
      duration: "NONE",
      cost: "NONE",
      secret: false,

      tags: [],

      steps: [],

      // 기본 정보
      setTitle: (title) => set({ title }),
      setDescription: (desc) => set({ description: desc }),
      setThumbnail: (url) => set({ thumbnail: url }),
      setDuration: (duration) => set({ duration }),
      setCost: (cost) => set({ cost }),
      toggleSecretMode: () =>
        set((state) => ({ secret: !state.secret })),

      // 태그
      setTags: (tags) => set({ tags }),
      toggleTag: (tagKey) =>
        set((state) =>
          state.tags.includes(tagKey)
            ? { tags: state.tags.filter((t) => t !== tagKey) }
            : { tags: [...state.tags, tagKey] }
        ),


      // Step 추가
      addStep: (step) => {
        const { steps } = get();
        const newStep: CourseStep = {
          stepOrder: steps.length + 1,
          ...step,
        };
        set({ steps: [...steps, newStep] });
      },

      // Step 업데이트
      updateStep: (order, data) => {
        set((state) => ({
          steps: state.steps.map((s) =>
            s.stepOrder === order ? { ...s, ...data } : s
          ),
        }));
      },

      // Step 삭제 + 순서 재정렬
      deleteStep: (order) => {
        set((state) => {
          const filtered = state.steps.filter((s) => s.stepOrder !== order);
          const reordered = filtered.map((s, idx) => ({
            ...s,
            stepOrder: idx + 1,
          }));
          return { steps: reordered };
        });
      },

      setSteps: (newSteps) =>
        set({
          steps: newSteps.map((s, idx) => ({
            ...s,
            stepOrder: idx + 1, // 항상 1부터 다시 정렬
          })),
        }),

      // 전체 초기화
      clearAll: () => {
        set({
          title: "",
          description: "",
          thumbnail: null,
          duration: "NONE",
          cost: "NONE",
          secret: false,
          tags: [],
          steps: [],
        });

        // persist 로컬 스토리지까지 초기화
        if (typeof window !== "undefined") {
          localStorage.removeItem("course-create-storage");
        }
      }

    }),

    {
      name: "course-create-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
