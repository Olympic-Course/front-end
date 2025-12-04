// src/store/userStore.ts : 회원정보 저장 store
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LoginData } from "@/types/auth";

interface UserState {
  userId: number | null;
  email: string | null;
  nickname: string | null;

  isLoggedIn: boolean;

  setUser: (data: LoginData) => void;
  updateNickname: (nickname: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      nickname: null,
      isLoggedIn: false,

      setUser: (data) =>
        set({
          userId: data.userId,
          email: data.email,
          nickname: data.nickname,
          isLoggedIn: true,
        }),

      updateNickname: (nickname) => set({ nickname }),

      clearUser: () =>
        set({
          userId: null,
          email: null,
          nickname: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);