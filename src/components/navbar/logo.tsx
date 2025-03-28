import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center h-14">
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={60}
          className="h-full w-auto"
        />
      </div>
    </Link>
  );
}
