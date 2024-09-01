import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className="flex items-center">
                <img src="/logo.svg" alt="Logo" className="w-40 h-16" />
            </div>
        </Link>
    );
}