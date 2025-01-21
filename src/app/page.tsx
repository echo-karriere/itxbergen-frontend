'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonIXB from "@/components/utils/button-ixb";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-white h-[70vh] flex flex-col md:flex-row items-center relative">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-start pl-40 space-y-16 w-[60%] mb-32">
          {/* Large Text */}
          <h1 className="text-black text-3xl md:text-5xl font-bold">
            <span className="text-IXBPurple">Karrieredag</span> og
            <span className="text-IXBPurple"> nettverking</span> <br /> for IT-studenter i Bergen!
          </h1>

          {/* IXBButton */}
          <ButtonIXB
            label="Sjekk ut karrieredagen vår"
            onClick={handleButtonClick}
            variant="primary"
          />

          {/* Subtext */}
          <p className="text-black text-base md:text-xl">
            Ikke karrieredag enda? <br />
            Sjekk ut mulighetene for <span className="font-bold underline">nettverking</span>!
          </p>
        </div>

        {/* Right Side Image */}
        <div className="absolute right-0 flex justify-center items-center mb-12 pr-10 w-[40%]">
          <Image
            src="/tech-company-amico.png"
            alt="ItxBergen"
            height={500}
            width={500}
            className="object-contain"
            draggable="false"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white h-[40vh] flex justify-center items-center relative">
        {/* Wave separator at the top */}
        <div className="absolute top-0 w-full" style={{ marginTop: '-10vh' }}>
          <Image
            src="/wave_top.png"
            alt="Wave"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-IXBbg1 text-white h-[90vh] flex justify-center items-center relative">
        {/* Wave separator at the bottom */}
        <div className="absolute top-0 w-full" style={{ marginTop: '-10vh' }}>
          <Image
            src="/wave_bottom.png"
            alt="Wave"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
