"use client";

import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import ButtonIXB from "@/components/utils/button-ixb";
import Otherthings from "@/components/utils/otherthings";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ForBedrifter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [orgNumber, setOrgNumber] = useState<string>("")

  const toggleDropdown = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dropdownItems = [
    {
      title: "Møte studenter på stand",
      content:
        "Alle som deltar på karrieredagene får en stand hvor de kan møte studenter og fortelle om bedriften sin. Det er også mulig å finne områder for lynintervjuer.",
    },
    {
      title: "Lynpresentasjoner",
      content:
        "3 minutters kort introduksjon av bedriften for å informere studentene om at dere står på stand og gjerne litt kort om hvorfor de skal besøke nettopp deres stand. Lynpresentasjoner skjer på starten av dagen før standområdet åpnes.  Vi har ballongslipp med premier før lynpresentasjonene for å tiltrekke oss flere studenter på morgenen.",
    },
    {
      title: "Workshops",
      content:
        "60 minutter workshop med studenter. Det vil være enkel snacks og drikke  tilgjengelig, uten ekstra kostnader. Vi lager påmeldingsside for  presentasjonen. Dersom det er ledige plasser ved start slipper vi inn de som ønsker, så lenge det er ledig plass. Dere er selv ansvarlige for å  promotere deres workshop, men dere vil få mulighet til å benytte dere av våre kanaler dersom dere ønsker.",
    },
    {
      title: "ITxBergen Galla",
      content:
        "Det er mulig å delta på etterfesten som avholdes etter karrieredagene.  Dere får muligheten til å dele ut ti gullbilletter helt fritt til de  studentene dere ønsker.",
    },
    {
      title: "Frakt",
      content:
        "Vi kan tilby frakt til karrieredagene via en tredjepart. Ta kontakt med oss for mer informasjon.",
    },
    {
      title: "Promotering",
      content:
        "Vi kan tilby ekstra promotering på forespørsel. Ta kontakt med oss for mer informasjon.",
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrgNumber(event.target.value)
  }


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
              <span>Karrieredag for bedrifter</span>
            </h1>
            <p className="text-base">
              ITxBergen er en frivillig studentorganisasjon som arrangerer
              karrieredager som holdes minst en gang i året. Det er en
              organisasjon som gjennom året jobber for IT-studentene i
              Bergensområdet skal ha en plattform hvor de kan finne og møte
              bedrifter, være med på foredrag og workshops og mer! <br /> <br />
              Gjennom deltakelse på ITxBergen får bedriftene muligheten til å
              møte fremtidens IT-talenter, og samtidig få en unik mulighet til å
              markedsføre seg selv. Arrangementet vil også bli eksponert i flere
              kanaler, og når i dag ut til studenter ved Universitetet i Bergen,
              Høgskulen på Vestlandet, Kristiania - Campus Bergen og alle
              interesserte.
            </p>

            {/* PåmeldingSkjema */}
            {/* <div className="pt-8"> */}
            {/*   <ButtonIXB */}
            {/*     label="Til Påmeldingsskjema" */}
            {/*     subLabel="18. September, 2025" */}
            {/*     variant="primary" */}
            {/*     onClick={() => window.open("https://delta.itxbergen.no/")} */}
            {/*   /> */}
            {/* </div> */}

            <div className="my-4">
              <label className="font-bold text-sm">
                Sjekk status for din bedrift
              </label>
              <input
                type="search"
                className="w-full px-4 mt-1 py-1 border border-black rounded-md text-gray-600"
                placeholder="Organisasjonsnummer"
                value={orgNumber}
                onChange={handleChange}
              />
              <Link href={`/karrieredag/bedrifter/${orgNumber}/`}>
                <div className="w-16 bg-IXBbg text-IXBfg border border-r-IXBfg p-1 text-center justify-center">
                  Søk
                </div>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/testing_amico.svg"
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
      <div className="bg-IXBbg2 shadow-lg mb-4 text-black h-auto flex flex-col md:flex-row justify-center items-center relative">
        {/* Content Wrapper */}
        <div className="maxwidth relative flex flex-col md:flex-row justify-between items-start w-full px-6 md:px-32 mb-24 mt-24 md:gap-16">
          {/* Left Text Content */}
          <div
            className="flex flex-col justify-center mx-6 md:w-1/2 space-y-6 text-left"
            style={{ minHeight: "200px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold">
              Hva kan bedriftene forvente seg på karrieredagen?
            </h2>
            <p className="text-base">
              Karrieredagen er en spennende dag! Her har du som bedrift mulighet
              til å møte engasjerte studenter innen IT! Hvert år jobber vi for å
              skape den beste karrieredagen hittil! <br /> <br />
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

      <div className="bg-white text-black min-h-auto flex items-start justify-center relative">
        {/* Content Wrapper */}
        <div className="maxwidth relative flex flex-col md:flex-row justify-between items-start w-full px-6 md:px-32 mb-12 mt-12 md:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center mx-6 md:w-1/2 space-y-6 text-left">
            <h2 className="text-xl md:text-2xl font-bold">Priser</h2>
            <p>
              Prisene våre er ikke hemmelige, og ligger synlig i vårt
              påmeldingsskjema. Den vil automatisk regne ut prisen for dere
              basert på hvilke valg dere gjør, og på denne måten vet dere hva
              dere må betale. Prisene vil korrigeres årlig avhengig av våre
              kostnadder og andre faktorer, og vil aldri være klar før
              påmeldingen åpner.
            </p>
            <h2 className="text-xl md:text-2xl font-bold md:mt-4">
              Andre arrangementer
            </h2>
            <p>
              En gang i blant arrangerer vi andre arrangementer som ikke er
              karrieredager. Dette kan være foredrag, workshops, eller andre
              arrangementer som vi mener kan være interessant for studentene. Vi
              sender ofte ut forespørsler til bedrifter som har samtykket til å
              motta dette.
            </p>
            <h2 className="text-xl md:text-2xl font-bold md:mt-4">
              E-postliste
            </h2>
            <p>
              Vi har en e-postliste som vi bruker til å sende ut informasjon til
              bedrifter. Hvis du er usikker på om du er på denne listen, eller
              om du ønsker å bli påmeldt, kan du sende en e-post til oss til{" "}
              <a href="mailto:example@example.com" className="font-bold">
                kontakt@itxbergen.no
              </a>
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center flex-grow mt-24 md:mt-24">
            {/* Company box */}
            <div className="w-full md:w-[85%] h-[400px] bg-IXBbg text-white rounded-t-3xl rounded-tr-[150px] shadow-2xl flex flex-col items-center justify-center text-left space-y-4 p-6">
              <p className="text-lg font-bold">
                Har bedriften deres en stillingsannonse dere ønsker å legge ut?
              </p>

              <p className="text-sm pb-4">
                <span className="font-bold">
                  Vi tilbyr gratis annonsering av stillingsannonser på våre
                  nettsider.
                </span>{" "}
                <br /> <br />
                Klikk på knappen under for å publisere deres stillingsannonse.
              </p>

              <a
                href={
                  "https://airtable.com/appa8dZYt9s6GSS8K/shrEXkOYcPiAG7cDP"
                }
              >
                <ButtonIXB
                  label={"Publiser stillingsannonse"}
                  variant="ghost"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <Otherthings />
    </div >
  );
}
