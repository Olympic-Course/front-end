interface TagProps {
    label: string;
}

export default function Tag({label}: TagProps){
    return(
        <div className="border border-(--color-main) rounded-full text-[9px] text-(--color-main) px-2 py-1 font-medium">
            {label}
        </div>
    );
}