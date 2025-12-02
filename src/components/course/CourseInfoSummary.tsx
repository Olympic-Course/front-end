interface CourseInfoSummaryProps{
    label: "작성자"|"소요시간"|"소요금액";
    info: string;
}

export default function CourseInfoSummary({ label, info }: CourseInfoSummaryProps){
    return(
        <div className="flex gap-1 text-[11px] text-[#8D8D8D] font-semibold">
            <span>{label}</span>
            |
            <span>{info}</span>
        </div>
    );
}