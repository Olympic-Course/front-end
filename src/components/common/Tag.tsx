interface TagProps {
    label: string;
}

export default function Tag({label}: TagProps){
    return(
        <div className="border border-(--color-main) rounded-full text-xs text-(--color-main) px-2.5 py-1.5 font-medium">
            {label}
        </div>
    );
}