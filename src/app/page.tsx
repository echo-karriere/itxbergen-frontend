"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ButtonIXB from "@/components/utils/button-ixb";
import EventCard from "@/components/utils/event-card";
import NewsCard from "@/components/utils/news-card";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/karrieredag");
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-black flex items-center justify-center relative ">
        {/* Content Wrapper */}
        <div className="maxwidth pt-24 flex flex-col md:flex-row items-center w-full -pb-12 md:px-40 space-y-12 md:space-y-0 md:space-x-20">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-8 md:space-y-16">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-IXBPurple">Karrieredag</span> og
              <span className="text-IXBPurple"> nettverking</span> <br /> for
              IT-studenter i Bergen!
            </h1>
            <ButtonIXB
              label="Sjekk ut karrieredagen vår"
              onClick={handleButtonClick}
              variant="primary"
            />
            <p className="text-base md:text-lg">
              Ikke karrieredag enda? <br />
              Sjekk ut mulighetene for{" "}
              <span className="font-bold underline">nettverking</span>!
            </p>
          </div>

          {/* Image */}
          <div>
            <Image
              src="/tech-company-amico.png"
              alt="ItxBergen"
              height={500}
              width={500}
            
              draggable="false"
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/wave_top_dark.svg"
          alt="Wave Top"
          layout="intrinsic" 
          className="bg-IXBbg2 w-full"
          width={1920}
          height={1080}
         
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white flex items-center justify-center ">
        {/* Wave separator at the top */}

        {/* Content Wrapper */}
        <div
          className="maxwidth w-11/12 flex flex-col md:flex-row items-center -py-12"
  
        >
          {/* Text Content */}
          <div className="w-full md:w-3/5 flex flex-col space-y-14 text-center md:text-left mt-12 md:mt-0">
            <h1 className="text-IXBfg text-3xl font-bold">Hva er ITxBergen?</h1>
            <p className="text-lg">
              ITxBergen arrangerer karrieredager for IT-studenter i
              bergensområdet, og er tidligere kjent som echo karriere.
              Arrangementet ble holdt for første gang i 2019, noe som ble en
              stor suksess med stort oppmøte fra IT-studenter fra hele Bergen.
              Enkelte ganger holder vi også andre karrierefremmende
              arrangementer.
              <br /> <br />
              Vi er en frivillig studentorganisasjon som samarbeider med andre
              linjeforeninger innenfor IT i Bergen, for å skape en felles årlig
              karrieredag. Vi når ut til linjeforeningene ved Universitetet i
              Bergen, Høgskulen på Vestlandet og Høyskolen Kristiania. Samtidig
              skaper vi et arrangement som er åpent for alle IT-studenter i
              Bergen, og alle som er interesserte.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-2/5 flex justify-center items-center">
            <Image
              src="/Logopakke/PNG/submark_darkBG.png"
              alt="ITxBergen"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain transform scale-150"
              draggable="false"
            />
          </div>
        </div>

        {/* Wave separator at the bottom */}
        

      </div>
      <div>
        <Image
          src="/wave_bottom_dark.svg"
          alt="Wave Top"
          layout="intrinsic" 
          className="bg-IXBbg1 w-full"
          width={1920}
          height={1080}
         
        />
      </div>

      {/* Section 3 */}
      <div className="bg-IXBbg1 text-black h-auto flex items-center justify-center relative pb-12 pt-6 px-8">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40">
          <div className="w-full flex flex-col space-y-16">
            {/* Events Section */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">
                Kommende arrangementer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                <EventCard
                  title="Github Workshop med SPV"
                  date="23. Mars 17:00"
                  address="Jonsvollsgaten 2"
                  redirectTo="/event/github-workshop"
                />
              </div>
            </div>

            {/* News Section */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Nyheter</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                <NewsCard
                  image="/fuckup.png"
                  title="News Article 1"
                  date="January 5, 2025"
                />
                <NewsCard
                  image="/fuckup.png"
                  title="News Article 2"
                  date="February 10, 2025"
                />
                <NewsCard
                  image="/fuckup.png"
                  title="News Article 3"
                  date="March 15, 2025"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
