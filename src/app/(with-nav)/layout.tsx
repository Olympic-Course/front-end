import '../globals.css';
import Image from 'next/image';
import logoImage from "/public/img/OlCo_logo_2.png";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col justify-between h-screen'>
            {/* 상단 로고 헤더 영역 */}
            <div className='p-4 flex items-start'>
                <Image
                    src={logoImage}
                    width={100}
                    // height={}
                    alt="Logo"
                />
            </div>
            {children}
            <div className='bg-white w-full rounded-lg p-6'>
                네비게이션바
            </div>
        </div>
    );
}