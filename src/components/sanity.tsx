import Image from "next/image";
import React from "react";

export default function Sanity() {
  return (
    <a href="https://www.sanity.io/">
      <div className="flex items-center">
        <Image
          src="/sanity.svg"
          alt="Sanity"
          width={80}
          height={30}
          className="w-22 h-8" />
      </div>
    </a>
  );
}
