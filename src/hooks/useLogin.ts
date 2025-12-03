import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { LoginRequest } from "@/types/auth"
import { useUserStore } from "@/store/userStore";

export function useLogin() {
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: (payload: LoginRequest) => login(payload),

        onSuccess: (res) => {
            if (res.data) {
                // ← Zustand에 저장
                setUser(res.data);
            }
        },
    });
}