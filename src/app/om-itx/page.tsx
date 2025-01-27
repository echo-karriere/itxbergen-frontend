import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/breadcrumbs";

const Page = () => {
  return (
    <>
      <div className="flex pl-12 space-y-12 pt-10">
        <div className="w-[37%] pl-16">
          <Breadcrumbs current={"Om ITxBergen"} />
          <h1 className="font-promptBold font-bold text-5xl/10 leading-tight mb-6 pt-5">
            Om ITxBergen
          </h1>
          <p className="font-sourceSans text-sm/8 text-[#121212]">
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
        <div className="w-[40%]">
          <Image
            src="/omitxbilde.png"
            alt="ITxBergen illustration"
            width={525}
            height={525}
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
