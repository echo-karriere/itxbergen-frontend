'use client';


import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-white h-[80vh] flex justify-center items-center">
        <div className="flex items-center mb-[15%] ml-[60%] w-1/2 pl-2">
          <Image
            src="/tech-company-amico.png"
            alt="ItxBergen"
            height={450}
            width={450}
            className="object-contain"
          />
        </div>

        {/* SVG wave seperator 1 */}
        <div className="absolute bottom-0 w-full">
          <Image
            src="wave.svg"
            alt="Wave"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white h-[50vh] flex justify-center items-center">
      </div>

      {/* Section 3 */}
      <div className="bg-IXBbg1 text-white h-[50vh] flex justify-center items-center">
      </div>
    </div>
  );
}
