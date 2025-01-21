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
      <div className="bg-IXBbg2 text-black h-[70vh] flex flex-col md:flex-row items-center relative">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-start pl-40 space-y-16 w-[60%] mb-32">
          {/* Large Text */}
          <h1 className="text-3xl md:text-5xl font-bold">
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
          <p className="text-base md:text-xl">
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
      <div className="bg-IXBbg text-white h-[70vh] flex flex-col justify-center items-center relative">
        {/* Wave separator at the top */}
        <div className="absolute top-0 w-full" style={{ marginTop: '-10vh' }}>
          <Image
            src="/wave_top.png"
            alt="Wave Top"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </div>

        {/* Content Section */}
        <div className="w-full flex justify-between items-center px-10" style={{ zIndex: '20' }}>
          {/* Text */}
          <div className="w-1/2 flex flex-col space-y-14 ml-24 mb-10">
            <h1 className="text-IXBfg text-3xl font-bold">Hva er ITxBergen?</h1>
            <p className="text-lg md:text-xl">
              ITxBergen arrangerer karrieredager for IT-studenter i
              bergensområdet, og er tidligere kjent som echo karriere.
              Arrangementet ble holdt for første gang i 2019, noe som ble en
              stor suksess med stort oppmøte fra  IT-studenter fra hele Bergen.
              Enkelte ganger holder vi også andre karrierefremmende
              arrangementer.
              <br /> <br />
              Vi er en frivillig  studentorganisasjon som
              samarbeider med andre linjeforeninger innenfor  IT i Bergen, for
              å skape en felles årlig karrieredag. Vi når ut til
              linjeforeningene ved Universitetet i Bergen, Høgskulen på
              Vestlandet og  Høyskolen Kristiania. Samtidig skaper vi et
              arrangement som er åpent for alle IT-studenter i Bergen, og alle
              som er interesserte.
            </p>
          </div>

          {/* Image */}
          <div className="w-1/2">
            <Image
              src="/Logopakke/PNG/submark_darkBG.png"
              alt="ITxBergen"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              draggable="false"
            />
          </div>
        </div>

        {/* Wave separator at the bottom */}
        <div className="absolute bottom-0 w-full" style={{ marginBottom: '-10vh', zIndex: '10' }}>
          <Image
            src="/wave_bottom.png"
            alt="Wave Bottom"
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
      </div>
    </div>
  );
}
