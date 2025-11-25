import '../globals.css';
import { ArrowLeft } from 'lucide-react';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col justify-start gap-4 h-screen'>
            {/* 상단 헤더 영역 */}
            {/* 상단 헤더 */}
            <div className="relative p-5 flex items-center">
                {/* 좌측 뒤로가기 버튼 */}
                <button>
                    <ArrowLeft className="z-10" />
                </button>
                {/* 가운데 제목 */}
                <p className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
                    헤더 제목
                </p>
            </div>
            {children}
        </div>
    );
}