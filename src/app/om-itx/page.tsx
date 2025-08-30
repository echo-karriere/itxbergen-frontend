import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import Styremedlemgrid from "@/components/utils/styremedlemgrid";
import OtherThings from "@/components/utils/otherthings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om ITxBergen | ITxBergen",
  description: "Informasjon om ITxBergen",
};

export default function AboutUS() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black h-auto flex items-center justify-center relative pt-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center md:items-start mx-6 md:mx-0 md:w-3/5 text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs customLast="Om ITxBergen" />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Om ITxBergen</span>
            </h1>
            <p className="text-base">
              ITxBergen arrangerer karrieredager for IT-studenter i
              bergensområdet, og er tidligere kjent som echo karriere.
              Arrangementet ble holdt for første gang i 2019, noe som ble en
              stor suksess med stort oppmøte fra IT-studenter fra hele Bergen.
              Enkelte ganger holder vi også andre karrierefremmende
              arrangementer. <br /> <br />
              Vi er en frivillig studentorganisasjon som samarbeider med andre
              linjeforeninger innenfor IT i Bergen, for å skape en felles årlig
              karrieredag. Vi når ut til linjeforeningene på Universitetet i
              Bergen, Høgskulen på Vestlandet og Høyskolen Kristiania. Samtidig
              skaper vi et arrangement som er åpent for alle IT-studenter i
              Bergen, og alle som er interesserte.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/hero/coding_amico.svg"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/wave_top_light.svg"
          alt="Wave Top"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain hidden md:flex"
          draggable="false"
        />
      </div>
      <div className="bg-IXBbg2 text-black h-auto pb-10 flex items-start justify-center relative shadow-lg">
        <div className="maxwidth w-full z-20 mt-4 md:mt-12 pt-5 md:pt-0">
          <Styremedlemgrid />
        </div>
      </div>
      <OtherThings />
    </div>
  );
}
