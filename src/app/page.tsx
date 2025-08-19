import React from "react";
import Image from "next/image";

import ButtonIXB from "@/components/utils/button-ixb";
import { Metadata } from "next";
import EventCard from "@/components/utils/event-card";
import NewsCard from "@/components/utils/news-card";
import Link from "next/link";
import { client } from "./lib/sanity";

interface news {
  image: string;
  title: string;
  currentSlug: string;
  _createdAt: string;
}

export const metadata: Metadata = {
  title: "ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

const Data = async () => {
  const query = `*[_type == 'news']{
    "image": newsimage.asset->url,
    title,
    "currentSlug": slug.current,
    _createdAt,

}`;

  const data = await client.fetch<news[]>(query);

  return data;
};

export default async function Home() {
  const data = await Data();
  return (
    <div>
      <div>
        {/* Section 1 */}
        <div className="bg-IXBbg2 text-black flex items-center justify-center relative pt-12">
          {/* Content Wrapper */}
          <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
            {/* Text Content */}
            <div className="flex flex-col justify-center mx-6 md:mx-0 items-start md:w-3/5 text-left space-y-8 md:space-y-8">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-IXBPurple">Karrieredag</span> og
                <span className="text-IXBPurple"> nettverking</span> <br /> for
                IT-studenter i Bergen!
              </h1>
              <p className="text-base font-bold md:text-4xl">
                Vi ses 18. September <br /> i Grieghallen, Bergen!
              </p>
              <p className="font-bold">Timeplan kommer i august.</p>
              <div className="flex flex-col space-y-2">
                <Link href={"/karrieredag"}>
                  <ButtonIXB
                    label="Sjekk ut karrieredagen vår"
                    variant="primary"
                    className="w-[21rem]"
                  />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center w-full md:w-2/5">
              <Image
                src="/tech-company-amico.svg"
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
          width={1920}
          height={1080}
          className="hidden md:flex bg-IXBbg2 w-full"
          draggable={false}
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white flex items-center justify-center pb-10 md:pb-0">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full md:px-32">
          {/* Text Content */}
          <div className="mx-6 md:mx-0 md:w-3/5 flex flex-col space-y-8 text-left">
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
          <div className="w-full md:w-2/5 items-center justify-center hidden md:flex">
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
              <h2 className="text-2xl font-bold mb-6">Nyheter</h2>
              <div className="grid grid-cols-1 mb-3 md:grid-cols-3 gap-6 place-items-center">
                <Link href={"/nettverking/styremedlem/"}>
                  <NewsCard
                    image={"/Nettside_filler.png"}
                    title={"Vi søker nye styremedlemmer!"}
                    date={"19. August 2025"}
                    height="14rem"
                  />
                </Link>
                {data
                  .sort(
                    (a, b) =>
                      new Date(b._createdAt).getTime() -
                      new Date(a._createdAt).getTime(),
                  )
                  .map((job, index) => (
                    <Link key={index} href={job.currentSlug}>
                      <NewsCard
                        title={job.title}
                        image={job.image}
                        date={job._createdAt}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="maxwidth flex flex-col items-center justify-center">
          <p className="font-bold p-5 pt-8 text-lg">Takk til vår støttespiller</p>
          <Image className="w-64 p-5 pb-20" src="/SPN-main-logo.png" alt="" width={800} height={1200} />
        </div>
      </div>
    </div>
  );
}
