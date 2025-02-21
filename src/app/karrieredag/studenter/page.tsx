import Breadcrumbs from "@/components/utils/breadcrumbs";
import Otherthings from "@/components/utils/otherthings";
import Image from "next/image";

export default function ForStudenter() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black md:h-[80vh] h-auto flex items-center justify-center relative pt-12 md:pt-0">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs
              current="Karrieredag"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Karrieredag for studenter</span>
            </h1>
            <p className="text-base">
              Lyst til å bli bedre kjent med dine jobbmuligheter etter studiene? Eller kanskje du er på utkikk etter en sommerjobb? Da er ITxBergen sin karrieredag noe for deg! På denne dagen vil du få muligheten til å møte representanter fra ulike bedrifter og organisasjoner som er interessert i å rekruttere studenter. Det vil også være mulighet for å delta på ulike workshops og foredrag. <br /> <br />
              Vi inviterer bedrifter fra hele landet som på et eller annet vis driver med IT. Alt fra offentlige etater, konsulentselskap til produktselskaper kommer til Bergen for å møte studenter. <br /> <br />
              Du er invitert til å delta på ITxBergen sine karrieredager, og vi håper du tar turen. Alle som studerer IT samt alle som er interessert er velkommen, uansett studieprogram og studiested. Det er gratis å delta på karrieredagene.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/coding_amico.png"
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
