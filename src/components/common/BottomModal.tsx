"use client";

import { ReactNode, useState } from "react";

interface BottomModalProps {
    children: ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function BottomModal({ isOpen, children, onOpenChange }: BottomModalProps) {

    const [startY, setStartY] = useState<number | null>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        setStartY(e.clientY);

        // 🔥 포인터 캡처 (핵심)
        const target = e.target as HTMLElement;
        target.setPointerCapture(e.pointerId);
    };


    const handlePointerUp = (e: React.PointerEvent) => {
        console.log("업!", e.clientY);

        const target = e.target as HTMLElement;
        target.releasePointerCapture(e.pointerId);

        if (startY === null) return;

        const diff = e.clientY - startY;
        console.log("드래그 diff:", diff);

        const THRESHOLD = 1;

        if (diff < -THRESHOLD) {
            console.log("위로 드래그 → 열기");
            onOpenChange(true);
        } else if (diff > THRESHOLD) {
            console.log("아래로 드래그 → 닫기");
            onOpenChange(false);
        }

        setStartY(null);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (startY !== null) {
            console.log("무브", e.clientY);
        }
    };

    return (
        <div
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full transition-all duration-300 flex justify-center"
        >
            <div
                className="w-full max-w-[480px] max-h-[50vh] rounded-t-2xl flex flex-col bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]"
            >
                {/* Drag Handle */}
                <div
                    className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing touch-none pointer-events-auto"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={() => setStartY(null)}
                >
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>

                {/* Scrollable Content */}
                <div
                    className={`
                        overflow-y-auto overflow-x-hidden
                        transition-all duration-500 ease-out
                        ${isOpen ? "max-h-[50vh] opacity-100" : "max-h-0 opacity-0"}
                    `}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
