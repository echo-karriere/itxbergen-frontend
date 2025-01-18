'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonIXB from "@/components/utils/button-ixb";
import Footer from "@/components/footer/footer";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-white h-[95vh] flex items-center relative">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-start pl-40 space-y-16 w-[60%] mb-80">
          {/* Large Text */}
          <h1 className="text-black text-5xl font-bold">
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
          <p className="text-black text-2xl">
            Ikke karrieredag enda? <br />
            Sjekk ut mulighetene for nettverking!
          </p>
        </div>

        {/* Right Side Image */}
        <div className="absolute right-0 flex justify-center items-center mb-60 pr-10 w-[40%]">
          <Image
            src="/tech-company-amico.png"
            alt="ItxBergen"
            height={500}
            width={500}
            className="object-contain"
          />
        </div>

        {/* SVG wave separator 1 */}
        <div className="absolute bottom-0 w-full" style={{ marginBottom: '-10vh' }}>
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
