"use client";

import { useState } from "react";
import Otherthings from "@/components/utils/otherthings";
import Stillingsannonser from "@/components/utils/stillingsannonser";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import DropdownSearch from "@/components/utils/dropdown-search";
import ButtonIXB from "@/components/utils/button-ixb";

const Page = () => {
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [typeSearchTerm, setTypeSearchTerm] = useState("");

  const allJobs = [
    {
      image: "/statensvegvesen.png",
      title: "Fra sommerjobb til samfunnsnyttig rolle!",
      company: "Statens vegvesen",
      location: "Bergen, Oslo, Trondheim, Drammen, Skien, Moss",
      type: "Sommerjobb",
      date: "10. Januar 2025",
    },
    {
      image: "/statensvegvesen.png",
      title: "Fra sommerjobb til samfunnsnyttig rolle!",
      company: "Statens vegvesen",
      location: "Bergen, Oslo, Trondheim, Drammen, Skien, Moss",
      type: "Sommerjobb",
      date: "10. Januar 2025",
    },
    {
      image: "/knowit.png",
      title: "Nyutdannede utviklere i Bergen 2025",
      company: "Knowit",
      location: "Bergen",
      type: "Fulltid",
    },
  ];

  const filteredJobs = allJobs.filter(
    (job) =>
      job.company.toLowerCase().includes(companySearchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationSearchTerm.toLowerCase()) &&
      job.type.toLowerCase().includes(typeSearchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="m-8 md:ml-40 md:mt-28 flex flex-col items-center md:items-start">
        <Breadcrumbs current={"Stillingsannonser"} />
        <h1 className="text-3xl md:text-4xl font-bold mb-9 md:mt-4">
          <span>Stillingsannonser</span>
        </h1>
        <div className="flex flex-col md:flex-row">
          <div>
            <DropdownSearch
              filterFrom={"bedrift"}
              onSearch={setCompanySearchTerm}
            />
            <DropdownSearch
              filterFrom={"sted"}
              onSearch={setLocationSearchTerm}
            />
            <DropdownSearch filterFrom="type" onSearch={setTypeSearchTerm} />

            {/* Legg til annonse */}
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 max-w-lg mx-auto shadow-md mt-14">
              {/* Title */}
              <h2 className="text-xl/8 md:text-2xl font-bold text-gray-900">
                Har bedriften deres en stillingsannonse dere ønsker å legge ut?
              </h2>

              {/* Subheading */}
              <p className="mt-4 text-gray-700 font-semibold">
                Vi publiserer stillingsannonser for alle typer stillinger
                innenfor <span className="font-bold">IT-bransjen</span>, og vi
                har et stort publikum av IT-interesserte studenter og
                arbeidstakere.
              </p>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm">
                Vi tilbyr gratis annonsering av stillingsannonser på våre
                nettsider. Klikk på knappen under for å publisere deres
                stillingsannonse på denne siden. Vi går gjennom alle
                stillingsannonser før de publiseres. Her er det også mulighet å
                redigere stillingsannonser, eller fjerne den dersom dere
                allerede har publisert en stillingsannonse.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6">
                {/* Primary Button */}
                <ButtonIXB
                  label={"Publiser stillingsannonse"}
                  variant="primary"
                  className="w-[95%]"
                />
                {/* Secondary Button */}
                <div className="mt-3 text-center">
                  <a
                    href="#"
                    className="text-gray-700 font-medium hover:underline flex items-center justify-center"
                  >
                    Rediger stillingsannonse
                    <span className="ml-2">➝</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Stillingsannonser jobs={filteredJobs} />
        </div>
        <Otherthings />
      </div>
    </>
  );
};

export default Page;
