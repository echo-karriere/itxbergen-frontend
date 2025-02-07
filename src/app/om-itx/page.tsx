import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import Wavepattern from "@/components/utils/general-wavepattern";
import Styremedlemgrid from "@/components/utils/styremedlemgrid";
import Otherthings from "@/components/utils/otherthings";

const Page = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:pl-12 md:pr-0 space-x-12 pt-10 pl-4 pr-4">
        <div className="md:w-[40%] md:pl-16">
          <Breadcrumbs current={"Om ITxBergen"} />
          <h1 className="font-promptBold font-bold text-5xl/10 leading-tight mb-6 pt-5">
            Om ITxBergen
          </h1>
          <p className="font-sourceSans text-sm md:text-sm/8 text-[#121212]">
            ITxBergen arrangerer karrieredager for IT-studenter i
            bergensområdet, og er tidligere kjent som echo karriere.
            Arrangementet ble holdt for første gang i 2019, noe som ble en stor
            suksess med stort oppmøte fra IT-studenter fra hele Bergen. Enkelte
            ganger holder vi også andre karrierefremmende arrangementer.
            <br></br>
            <br></br>
            Vi er en frivillig studentorganisasjon som samarbeider med andre
            linjeforeninger innenfor IT i Bergen, for å skape en felles årlig
            karrieredag. Vi når ut til linjeforeningene på Universitetet i
            Bergen, Høgskulen på Vestlandet og Høyskolen Kristiania. Samtidig
            skaper vi et arrangement som er åpent for alle IT-studenter i
            Bergen, og alle som er interesserte.
          </p>
        </div>
        <div className="md:w-[60%] flex items-center justify-center">
          <Image
            src="/omitxbilde.png"
            alt="ITxBergen illustration"
            width={525}
            height={525}
            className="rounded-lg"
          />
        </div>
      </div>
      <Wavepattern>
        <Styremedlemgrid />
      </Wavepattern>

      <div className="w-[100%] flex justify-center"></div>
    </>
  );
};

export default Page;
