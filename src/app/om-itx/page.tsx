import React from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import Styremedlem from "@/components/utils/styremedlem";

const Page = () => {
  return (
    <>
      <div className="flex pl-12 space-x-12 pt-10">
        <div className="w-[40%] pl-16">
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
        <div className="w-[60%] flex items-center justify-center">
          <Image
            src="/omitxbilde.png"
            alt="ITxBergen illustration"
            width={525}
            height={525}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="h-20 bg-IXBbg"></div>

      <div className="w-[100%] flex justify-center pt-5">
        <ol>
          <Styremedlem
            image={"/fredric.png"}
            name={"Fredric Hegland"}
            title={"Leder"}
            mail={"fredric.hegland@itxbergen.no"}
          />
        </ol>
      </div>
    </>
  );
};

export default Page;
