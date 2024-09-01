import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={160}
          height={60}
          className="w-40 h-16" />
      </div>
    </Link>
  );
}
