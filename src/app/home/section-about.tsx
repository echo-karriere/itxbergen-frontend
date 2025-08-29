import Wave from "@/components/wave";
import HeroImage from "@/components/hero-image";

export default function SectionAbout() {
  return (
    <>
      <Wave position="top" theme="dark" bgColor="bg-IXBbg2" />

      <div className="bg-IXBbg text-white flex items-center justify-center pb-10 md:pb-0">
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

          <HeroImage
            src="/Logopakke/PNG/submark_darkBG.png"
            alt="ITxBergen Logo"
            className="md:flex hidden"
          />
        </div>
      </div>

      <Wave position="bottom" theme="dark" bgColor="bg-IXBbg1" />
    </>
  );
}
