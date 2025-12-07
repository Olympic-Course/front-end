"use client";

import { useSessionModalStore } from "@/store/sessionModalStore";
import SessionModal from "@/components/common/SessionModal";

export default function SessionModalProvider() {
  const { isOpen } = useSessionModalStore();

  if (!isOpen) return null;

  return <SessionModal />;
}
