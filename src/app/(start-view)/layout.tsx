import '../globals.css';
import Image from 'next/image';
import logoImage from "/public/img/OlCo_logo_1.png";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-(--color-main) gap-6 px-9'>
            <Image
                src={logoImage}
                width={180}
                height={180} 
                alt="Logo"
            />
            <div className='bg-white w-full rounded-lg px-6 py-8'>
                {children}
            </div>
        </div>
    );
}