"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navItems";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="flex justify-between items-center px-10 py-3 bg-(--color-navBg)">
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.path);

                return (
                    <Link key={item.name} href={item.path} className="flex flex-col items-center">
                        <Image
                            src={isActive ? item.icon.active : item.icon.inactive}
                            width={35}
                            height={35}
                            alt={item.name}
                        />
                        <span
                            className={`text-xs font-medium ${isActive ? "text-(--color-navActive)" : "text-(--color-navNomal)"}`}
                        >
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
