// src/store/userStore.ts : 회원정보 저장 store
import { create } from "zustand";
import type { LoginData } from "@/types/auth";

interface UserState {
  userId: number | null;
  email: string | null;
  nickname: string | null;

  isLoggedIn: boolean;

  setUser: (data: LoginData) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
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

  clearUser: () =>
    set({
      userId: null,
      email: null,
      nickname: null,
      isLoggedIn: false,
    }),
}));
