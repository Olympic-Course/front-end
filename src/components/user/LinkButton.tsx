import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
}

export default function LinkButton({ href, label }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="text-gray-400 text-xs font-medium p-1 rounded-md active:bg-gray-200 transition-all duration-150"
    >
      {label}
    </Link>
  );
}
