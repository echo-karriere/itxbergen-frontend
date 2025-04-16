"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import OrganisationCardList from "@/components/utils/organisation-card-list";
import { useState } from "react";
import Otherthings from "@/components/utils/otherthings";

interface Organisation {
  name: string;
  location: string;
  boxHeader: string;
  boxp1: string;
  boxp2: string;
  list: string[];
  address?: string;
  participants?: string;
  epost?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export default function Nettverking() {
  const [selectedLocation, setSelectedLocation] = useState("Vis alle");
  const [selectedOrganisation, setSelectedOrganisation] =
    useState<Organisation | null>(null);

  const socialLinks: { name: string; key: keyof Organisation; icon: string }[] = [
    { name: "Website", key: "website", icon: "/icons/website.png" },
    { name: "Facebook", key: "facebook", icon: "/icons/facebook.svg" },
    { name: "Instagram", key: "instagram", icon: "/icons/instagram.svg" },
    { name: "LinkedIn", key: "linkedin", icon: "/icons/linkedin.svg" },
    { name: "GitHub", key: "github", icon: "/icons/github.svg" },
  ];

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black flex justify-center relative md:pt-5">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20">
          {/* Text Content */}
          <div className="flex flex-col justify-center mx-6 md:mx-0 items-start md:w-3/5 text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Nettverking</span>
            </h1>
            <p className="text-base">
              ITxBergen er opptatt av at studentene skal finne rikelig med
              informasjon som kan fremme deres karriere innen IT.
            </p>
            <p className="text-base">
              På denne siden vil du finne ressurser for IT-studenter, som:
            </p>
            {/* Links */}
            <a
              href="#nettverking"
              className="flex items-center font-semibold hover:underline"
            >
              Studentorganisasjoner og linjeforeninger
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="/#bottom"
              className="flex items-center font-semibold hover:underline"
            >
              Arrangementer
              <ChevronRight className="w-5 h-5" />
            </a>

          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/pair_programming_amico.svg"
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
          layout="intrinsic"
          width={1920}
          height={1080}
          className="hidden md:flex bg-white w-full"
          draggable="false"
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg2 text-black h-auto p-3 flex items-start justify-center relative shadow-lg mb-3">
        {/* Content Wrapper */}
        <div id="nettverking" className="maxwidth relative flex flex-col text-start items-start w-full px-6 md:px-32 pt-8">
          {/* Text Section */}
          <div className="relative flex flex-col items-start pt-10 mx-6 md:mx-0">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-start">
                Studentorganisasjoner og linjeforeninger for <br /> IT-studenter
              </h2>
              <p>
                Vi har samlet alle studentorganisasjonene som retter seg mot
                IT-studenter linjeforeningene <br />
                ved Universitetet i Bergen, Høgskulen på Vestlandet og Høyskolen
                Kristiania!
              </p>
            </div>

            {/* Button row with filtering */}
            <div className="flex flex-col lg:flex-row md:space-x-12 text-sm pt-12 w-full">
              {[
                "Vis alle",
                "Universitetet i Bergen",
                "Høgskulen på Vestlandet",
                "Høyskolen Kristiania",
                "Annet",
              ].map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  className={`hover:underline hover:text-IXBPurple ${selectedLocation === location ? "text-IXBPurple font-bold" : ""}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </Button>
              ))}
            </div>

            {/* Line under buttons */}
            <div className="w-full lg:border-t-2 lg:border-black"></div>
          </div>

          {/* Organisation Section */}
          <div className="w-full pt-6">
            <OrganisationCardList
              selectedLocation={selectedLocation}
              onSelectOrganisation={setSelectedOrganisation}
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col md:flex-row w-full gap-6 pt-12 pb-20">
            {/* First Box */}
            <div className="w-full md:w-[55%] h-auto bg-white rounded-t-3xl p-6 shadow-2xl">
              {/* First Box Content */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {selectedOrganisation ? selectedOrganisation.name : "Velg en organisasjon"}
                </h3>
                <h2 className="font-bold text-black mb-4">
                  {selectedOrganisation ? selectedOrganisation.boxHeader : ""}
                </h2>
                <p className="text-gray-600">
                  {selectedOrganisation
                    ? selectedOrganisation.boxp1
                    : "Klikk på en organisasjon for å se mer informasjon."}
                </p>
                {selectedOrganisation && (
                  <div className="text-gray-600 mt-4">
                    <p>{selectedOrganisation.boxp2}</p>
                    {selectedOrganisation.list && (
                      <ul className="list-disc list-inside mt-2">
                        {/* If list is an array, map over it to display multiple bullet points */}
                        {Array.isArray(selectedOrganisation.list) ? (
                          selectedOrganisation.list.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>{selectedOrganisation.list}</li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              {selectedOrganisation && (
                <div className="flex justify-center gap-4 mt-8">
                  {selectedOrganisation && (
                    <div className="flex justify-center gap-4 mt-8">
                      {socialLinks.map(({ name, key, icon }) =>
                        selectedOrganisation[key] ? (
                          <Link key={key} href={selectedOrganisation[key] as string} target="_blank" rel="noopener noreferrer">
                            <Image
                              src={icon}
                              alt={name}
                              width={32}
                              height={32}
                              className="hover:opacity-80 transition-opacity"
                            />
                          </Link>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Second Box */}
            <div className="w-full md:w-[35%] h-auto bg-IXBbg1 rounded-t-3xl rounded-tr-[150px] p-6 shadow-2xl space-y-4">
              <p className="font-bold text-sm">Hvem kan være med?</p>
              <p className="text-sm">{selectedOrganisation?.participants}</p>

              <p className="font-bold text-sm">E-post</p>
              {selectedOrganisation?.epost ? (
                <p className="text-sm">
                  <a href={`mailto:${selectedOrganisation.epost}`}>
                    {selectedOrganisation.epost}
                  </a>
                </p>
              ) : (
                <p className="text-sm text-gray-500">E-post ikke tilgjengelig</p>
              )}
              <p className="font-bold text-sm">Besøksadresse</p>
              <p className="text-sm">{selectedOrganisation?.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <Otherthings />
    </div>
  );
}
