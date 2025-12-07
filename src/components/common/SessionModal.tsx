import { useSessionModalStore } from "@/store/sessionModalStore";
import Modal from "./Modal";
import ModalText from "./ModalText";
import { useRouter } from "next/navigation";

export default function SessionModal() {
    const router = useRouter();
    const { message, closeLoginModal } = useSessionModalStore();
    
    return (
        <Modal title="사용 불가" onClose={closeLoginModal}>
            <ModalText
                text={message}
                buttonClick={() => router.push("/")}
                buttonLabel="로그인 하러 가기"
            />
        </Modal>
    );
}