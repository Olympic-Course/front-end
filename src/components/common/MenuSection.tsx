interface MenuSectionProps {
    title: string;
    children: React.ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps){
    return(
        <div className="w-full flex flex-col gap-1 justify-start items-start">
            <span className="text-lg font-bold">{title}</span>
            {children}
        </div>
    );
}