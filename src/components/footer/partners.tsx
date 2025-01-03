import React from "react";
import Image from "next/image";

function Sanity() {
  return (
    <a href="https://www.sanity.io/">
      <div className="flex items-center">
        <Image
          src="/sanity.svg"
          alt="Sanity"
          width={70}
          height={1}
          className="object-contain"
        />
      </div>
    </a>
  );
}

function Vercel() {
  return (
    <a href="https://vercel.com/">
      <div className="flex items-center">
        <Image
          src="/vercel.svg"
          alt="Vercel"
          width={70}
          height={1}
          className="object-contain"
        />
      </div>
    </a>
  );
}

export default function Partners() {
  return (
    <div className="bg-white p-2 rounded-md shadow-md flex items-center justify-center space-x-4">
      <Vercel />
      <Sanity />
    </div>
  );
}
