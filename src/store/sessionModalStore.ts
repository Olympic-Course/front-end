// src/store/sessionModalStore.ts
import { create } from "zustand";

interface SessionModalState {
  isOpen: boolean;
  message: string;
  openLoginModal: (msg?: string) => void;
  closeLoginModal: () => void;
}

export const useSessionModalStore = create<SessionModalState>((set) => ({
  isOpen: false,
  message: "로그인이 필요한 기능입니다.",
  
  openLoginModal: (msg) =>
    set({
      isOpen: true,
      message: msg ?? "로그인이 필요한 기능입니다.",
    }),

  closeLoginModal: () =>
    set({
      isOpen: false,
    }),
}));
