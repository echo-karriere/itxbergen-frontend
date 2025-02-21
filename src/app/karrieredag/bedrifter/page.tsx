import Breadcrumbs from "@/components/utils/breadcrumbs";
import ButtonIXB from "@/components/utils/button-ixb";
import Otherthings from "@/components/utils/otherthings";
import Image from "next/image";

export default function ForBedrifter() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black md:h-[90vh] h-auto flex items-center justify-center relative pt-12 md:pt-0">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs
              current="Karrieredag"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Karrieredag for bedrifter</span>
            </h1>
            <p className="text-base">
              ITxBergen er en frivillig studentorganisasjon som arrangerer karrieredager som holdes minst en gang i året. Det er en organisasjon som gjennom året jobber for IT-studentene i Bergensområdet skal ha en plattform hvor de kan finne og møte bedrifter, være med på foredrag og workshops og mer! <br /> <br />
              Gjennom deltakelse på ITxBergen får bedriftene muligheten til å møte fremtidens IT-talenter, og samtidig få en unik mulighet til å markedsføre seg selv. Arrangementet vil også bli eksponert i flere kanaler, og når i dag ut til studenter ved Universitetet i Bergen, Høgskulen på Vestlandet, Kristiania - Campus Bergen og alle interesserte.
            </p>

            {/* PåmeldingSkjema */}
            <div className="pt-8">
              <ButtonIXB
                label="Til Påmeldingsskjema"
                variant="primary"
              />
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/testing_amico.png"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg2 text-black min-h-screen flex items-start justify-center relative">
        {/* Wave separator at the top */}
        <div className="absolute top-0 w-full -mt-[12vh]">
          <Image
            src="/wave_top_light.svg"
            alt="Wave Top"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </div>
      </div>

      {/* Section 3 */}
      <Otherthings />
    </div>
  )
}
