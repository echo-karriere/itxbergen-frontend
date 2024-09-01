import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" className="w-40 h-16" />
      </div>
    </Link>
  );
}
