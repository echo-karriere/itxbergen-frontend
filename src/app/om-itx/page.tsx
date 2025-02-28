import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import Styremedlemgrid from "@/components/utils/styremedlemgrid";
import Otherthings from "@/components/utils/otherthings";

export default function AboutUS() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black md:h-[70vh] h-auto flex items-center justify-center relative pt-12 md:pt-0">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs current="Om ITxBergen" />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Om ItxBergen</span>
            </h1>
            <p className="text-base">
              ITxBergen arrangerer karrieredager for IT-studenter i
              bergensområdet, og er tidligere kjent som echo karriere.
              Arrangementet ble holdt for første gang i 2019, noe som ble en
              stor suksess med stort oppmøte fra IT-studenter fra hele Bergen.
              Eneklte ganger holder vi også andre karrierefremmende
              arrangementer. <br /> <br />
              Vi er en frivillig studentorganisasjon som samarbeider med andre
              linjeforeninger innenfor IT i Bergen, for å sakpe en felles årlig
              karrieredag. Vi når ut til linjeforeningene på Universitetet i
              Bergen, Høgskulen på Vestlandet og Høyskolen Kristiania. Samtidig
              skaper vi et arrangement som er åpent for alle IT-studenter i
              Bergen, og alle som er interesserte.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/coding_amico.png"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <div className="bg-IXBbg2 text-black min-h-screen flex items-start justify-center relative">
        {/* Wave separator at the top */}
        <div className="w-full z-20 mt-4 md:mt-12">
          <Styremedlemgrid />
        </div>
      </div>
      <Otherthings />
    </div>
  );
}
