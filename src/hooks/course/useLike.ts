"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleLike } from "@/api/course";
import { useUserStore } from "@/store/userStore";
import { useSessionModalStore } from "@/store/sessionModalStore";

export function useLike(courseId: number, liked: boolean, likeNum: number) {
    const { isLoggedIn } = useUserStore();
    const { openLoginModal } = useSessionModalStore();

    const [useLiked, setUseLiked] = useState(liked);
    const [useLikeNum, setUseLikeNum] = useState(likeNum);

    const mutation = useMutation({
        mutationFn: () => toggleLike(courseId),
        onMutate: async () => {
            // optimistic update
            setUseLiked((prev) => !prev);
            setUseLikeNum((prev) => (liked ? prev - 1 : prev + 1));
        },
        onError: () => {
            // rollback
            setUseLiked(liked);
            setUseLikeNum(likeNum);
        },
        onSuccess: (data) => {
            setUseLiked(data.liked);
            setUseLikeNum(data.likeNum);
        },
    });

    const toggle = () => {
        if (!isLoggedIn) {
            openLoginModal(); // 혹은 router.push("/login")
            return;
        }

        mutation.mutate();
    };


    return {
        useLiked,
        useLikeNum,
        toggle,
    };
}
