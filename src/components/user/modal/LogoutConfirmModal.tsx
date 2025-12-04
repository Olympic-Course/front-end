import ModalText from "@/components/common/ModalText";

interface LogoutConfirmModalProps {
    buttonClick?: () => void;
    buttonLabel: string;
}

export default function LogoutConfirmModal({ buttonClick, buttonLabel }: LogoutConfirmModalProps) {
    return (
        <ModalText 
        text={"로그아웃 하시겠습니까?"} 
        buttonLabel={buttonLabel}
        buttonClick={buttonClick}
        />
    );
}