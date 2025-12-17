interface MenuSectionProps {
    title: string;
    required?: boolean;
    children: React.ReactNode;
}

export default function MenuSection({ title, children, required = false, }: MenuSectionProps){
    return(
        <div className="w-full flex flex-col gap-1 justify-start items-start">
            {/* <span className="text-lg font-bold">{title}</span> */}
            <label className="text-lg font-bold flex items-center gap-1">
                {title}
                {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}