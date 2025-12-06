"use client"

import '../globals.css';
import Image from 'next/image';
import logoImage from "/public/img/OlCo_logo_2.png";
import Navbar from '@/components/common/navbar';

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
                    alt="Logo"
                />
            </div>
            <div className='flex-1 overflow-y-auto scrollbar-none'>
                {children}
            </div>
            <Navbar />
        </div>
    );
}