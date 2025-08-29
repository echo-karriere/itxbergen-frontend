"use client";

import { Button } from "@/components/shadcn-ui/button";
import StudentOrganisationCardList from "@/components/utils/student-organisation-card-list";
import StudentOrganisationDetailsBox from "@/components/utils/student-organisation-detail-box";
import StudentOrganisationInfoBox from "@/components/utils/student-organisation-info-box";
import Wave from "@/components/wave";
import { StudentOrganisation } from "@/types/student-organisation";
import { useState } from "react";

const LOCATIONS = [
  "Vis alle",
  "Universitetet i Bergen",
  "Høgskulen på Vestlandet",
  "Høyskolen Kristiania",
  "Annet",
];

const LocationFilterButtonRow = ({
  locations,
  selected,
  onSelect,
}: {
  locations: string[];
  selected: string;
  onSelect: (location: string) => void;
}) => {
  return (
    <div className="flex flex-col lg:flex-row md:space-x-12 text-sm pt-12 w-full">
      {locations.map((location, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`hover:underline hover:text-IXBPurple ${selected === location ? "text-IXBPurple font-bold" : ""}`}
          onClick={() => onSelect(location)}
        >
          {location}
        </Button>
      ))}
    </div>
  );
};

export default function SectionStudentOrganisations() {
  const [selectedLocation, setSelectedLocation] = useState("Vis alle");
  const [selectedOrganisation, setSelectedOrganisation] =
    useState<StudentOrganisation | null>(null);

  return (
    <>
      <Wave position="top" theme="light" bgColor="white" />

      <div className="bg-IXBbg2 text-black h-auto p-3 flex items-start justify-center relative shadow-lg mb-3">
        <div
          id="nettverking"
          className="maxwidth relative flex flex-col text-start items-start w-full px-6 md:px-32 pt-8"
        >
          {/* Text Section */}
          <div className="relative flex flex-col items-start pt-10 mx-6 md:mx-0">
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

          <LocationFilterButtonRow
            locations={LOCATIONS}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
          />

          {/* Line under buttons */}
          <div className="w-full lg:border-t-2 lg:border-black"></div>

          <StudentOrganisationCardList
            selectedLocation={selectedLocation}
            onSelectOrganisation={setSelectedOrganisation}
          />

          <div className="flex flex-col md:flex-row w-full gap-6 pt-12 pb-20">
            <StudentOrganisationInfoBox organisation={selectedOrganisation} />
            <StudentOrganisationDetailsBox
              organisation={selectedOrganisation}
            />
          </div>
        </div>
      </div>
    </>
  );
}
