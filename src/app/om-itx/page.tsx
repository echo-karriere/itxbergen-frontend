import React from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="flex items-start space-x-12 space-y-12 pt-10">
        <div className="w-[37%] pl-16">
          <p className="font-inter text-xs text-[#121212] mb-2">
            <Link href="/">Hjem - Om ITxBergen</Link>
          </p>
          <h1 className="font-promptBold font-bold text-5xl leading-tight mb-6 pt-5">
            Om ITxBergen
          </h1>
          <p className="font-sourceSans text-xs/8 leading-relaxed text-[#121212]">
            ITxBergen arrangerer karrieredager for IT-studenter i
            bergensområdet, og er tidligere kjent som echo karriere.
            Arrangementet ble holdt for første gang i 2019, noe som ble en stor
            suksess med stort oppmøte fra IT-studenter fra hele Bergen. Enkelte
            ganger holder vi også andre karrierefremmende arrangementer. Vi er
            en frivillig studentorganisasjon som samarbeider med andre
            linjeforeninger innenfor IT i Bergen, for å skape en felles årlig
            karrieredag. Vi når ut til linjeforeningene på Universitetet i
            Bergen, Høgskulen på Vestlandet og Høyskolen Kristiania. Samtidig
            skaper vi et arrangement som er åpent for alle IT-studenter i
            Bergen, og alle som er interesserte.
          </p>
        </div>
        <div className="w-[40%] flex justify-end ml-8">
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
