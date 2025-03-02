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
      <div>
        {/* Section 1 */}
        <div className="bg-IXBbg2 text-black flex items-center justify-center relative pt-12">
          {/* Content Wrapper */}
          <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
            {/* Text Content */}
            <div className="flex flex-col justify-center mx-9 md:mx-0 md:items-start md:w-3/5 items-center text-left space-y-8 md:space-y-16">
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
            <div className="flex justify-center items-center w-full md:w-2/5">
              <Image
                src="/tech-company-amico.png"
                alt="ItxBergen"
                height={500}
                width={500}
                className="object-contain md:transform md:scale-110"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator at the top */}
      <div>
        <Image
          src="/wave_top_dark.svg"
          alt="Wave Top"
          layout="intrinsic"
          width={1920}
          height={1080}
          className="hidden md:flex bg-IXBbg2 w-full"
          draggable={false}
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white flex items-center justify-center">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full md:px-32">
          {/* Text Content */}
          <div className="mx-9 md:mx-0 md:w-3/5 flex flex-col space-y-8 text-left">
            <h1 className="text-IXBfg text-3xl font-bold mb-4 mt-10 md:mt-0">
              Hva er ITxBergen?
            </h1>
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
          <div className="w-full md:w-2/5 flex items-center justify-center">
            <Image
              src="/Logopakke/PNG/submark_darkBG.png"
              alt="ITxBergen"
              width={600}
              height={600}
              className="max-w-xl overflow-hidden"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/wave_bottom_dark.svg"
          alt="Wave Top"
          layout="intrinsic"
          width={1920}
          height={1080}
          className="hidden md:flex bg-IXBbg1 w-full"
          draggable="false"
        />
      </div>

      {/* Section 3 */}
      <div className="bg-IXBbg1 text-black h-auto flex items-center justify-center relative pb-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mt-14">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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
