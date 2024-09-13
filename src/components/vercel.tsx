import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <a href="https://vercel.com/">
      <div className="flex items-center">
        <Image
          src="/vercel.svg"
          alt="Vercel"
          width={80}
          height={30}
          className="w-22 h-8" />
      </div>
    </a>
  );
}
