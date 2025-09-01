"use client";

import { Button } from "@/components/shadcn-ui/button";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import OtherThings from "@/components/utils/otherthings";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ForStudenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dropdownItems = [
    {
      title: "Møte bedrifter",
      content:
        "Det vil være stands fra bedrifter som ønsker å rekruttere studenter.  Her vil du få muligheten til å snakke med representanter fra bedriften  og få vite mer om hva de driver med, hvilke muligheter de har og hvordan du kan søke på jobb hos dem.",
    },
    {
      title: "Ballongslipp",
      content:
        "Vi har ballongslipp med premier før lynpresentasjonene, så her er det smart å være tidlig ute!",
    },
    {
      title: "Lynpresentasjoner",
      content:
        "Usikker på hvem du skal snakke med? Her vil du få muligheten til å få en kort presentasjon av bedriften, og deretter kan du bestemme om du  vil snakke med dem eller ikke.",
    },
    {
      title: "Workshops",
      content:
        "Det vil være ulike workshops som du kan delta på. Her vil du få  muligheten til å lære mer om ulike temaer som er relevante for deg som student.",
    },
    {
      title: "ITxBergen Galla",
      content:
        "Studenter som gir et positivt inntrykk av seg selv på karrieredagene  kan kanskje være heldige i å få tak i en gullbillett til etterfesten. Mer  informasjon gis til de heldige som får gullbillett.",
    },
  ];

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black h-auto flex items-center justify-center relative pt-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-start mx-6 md:w-3/5 text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Karrieredag for studenter</span>
            </h1>
            <p className="text-base">
              Lyst til å bli bedre kjent med dine jobbmuligheter etter studiene?
              Eller kanskje du er på utkikk etter en sommerjobb? Da er ITxBergen
              sin karrieredag noe for deg! På denne dagen vil du få muligheten
              til å møte representanter fra ulike bedrifter og organisasjoner
              som er interessert i å rekruttere studenter. Det vil også være
              mulighet for å delta på ulike workshops og foredrag. <br /> <br />
              Vi inviterer bedrifter fra hele landet som på et eller annet vis
              driver med IT. Alt fra offentlige etater, konsulentselskap til
              produktselskaper kommer til Bergen for å møte studenter. <br />{" "}
              <br />
              Du er invitert til å delta på ITxBergen sin karrieredag, og vi
              håper du tar turen. Alle som studerer IT samt alle som er
              interessert er velkommen, uansett studieprogram og studiested. Det
              er gratis å delta på karrieredagene.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/hero/coding_amico.svg"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/wave_top_light.svg"
          alt="Wave Top"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain hidden md:flex"
          draggable="false"
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg2 text-black flex flex-col md:flex-row justify-center items-center relative shadow-lg">
        {/* Content Wrapper */}
        <div className="maxwidth relative flex flex-col md:flex-row justify-between items-start w-full px-6 md:px-32 mb-24 mt-24 md:gap-16">
          {/* Left Text Content */}
          <div
            className="flex flex-col justify-center md:w-1/2 space-y-6 text-left mx-6"
            style={{ minHeight: "200px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold">
              Hva du forvente deg?
            </h2>
            <p className="text-base">
              Karrieredagen er en spennende dag! Hvert år jobber vi for å skape
              den beste karrieredagen hittil!
              <br /> <br />
              Har dere noen tips? Send det gjerne på mail til oss på{" "}
              <a href="mailto:example@example.com" className="font-bold">
                kontakt@itxbergen.no
              </a>
            </p>
          </div>

          {/* Right Dropdown Section */}
          <div className="w-full md:w-1/2 border-t border-b border-gray-400 flex flex-col divide-y divide-gray-400 mt-12 md:mt-0">
            {dropdownItems.map((item, index) => (
              <div key={index}>
                <Button
                  className={`flex justify-between items-center w-full px-4 py-3 text-lg font-medium text-left transition-colors duration-200
                      bg-transparent
                      ${openIndex === index ? "text-IXBPurple" : "text-gray-800"}
                      hover:bg-gray-100 hover:text-IXBPurple`}
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 transform ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </Button>
                {openIndex === index && (
                  <p className="px-4 py-2 text-sm text-gray-700">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <OtherThings />
    </div>
  );
}
