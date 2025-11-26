import '../globals.css';
import Image from 'next/image';
import logoImage from "/public/img/OlCo_logo_1.png";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-(--color-main) gap-10 px-9'>
            <Image
                src={logoImage}
                width={250}
                height={250} 
                alt="Logo"
            />
            <div className='bg-white w-full rounded-lg px-6 py-12'>
                {children}
            </div>
        </div>
    );
}