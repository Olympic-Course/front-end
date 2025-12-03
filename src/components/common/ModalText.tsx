interface ModalTextProps{
    text: string;
}

export default function ModalText({ text }: ModalTextProps){
    return(
        <span className="flex justify-center w-full text-sm text-gray-500 font-medium">
            {text}
        </span>
    );
}