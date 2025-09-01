"use client";

import FilterButtonRow from "@/components/utils/filter-button-row";
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

export default function SectionStudentOrganisations() {
  const [selectedLocation, setSelectedLocation] = useState("Vis alle");
  const [selectedOrganisation, setSelectedOrganisation] =
    useState<StudentOrganisation | null>(null);

  return (
    <>
      <Wave position="top" theme="light" bgColor="white" />

      <div className="w-full bg-IXBbg2 py-12" id="nettverking">
        <div className="maxwidth text-black flex flex-col space-y-8 px-6 md:px-32">
          {/* Text Content */}
          <h2 className="text-2xl font-bold text-start">
            Studentorganisasjoner og linjeforeninger for <br /> IT-studenter
          </h2>

          <p>
            Vi har samlet alle studentorganisasjonene som retter seg mot
            IT-studenter linjeforeningene <br />
            ved Universitetet i Bergen, Høgskulen på Vestlandet og Høyskolen
            Kristiania!
          </p>

          <FilterButtonRow
            buttons={LOCATIONS}
            selectedButton={selectedLocation}
            onSelect={setSelectedLocation}
          />

          <StudentOrganisationCardList
            selectedLocation={selectedLocation}
            onSelectOrganisation={setSelectedOrganisation}
          />

          <div className="flex flex-col md:flex-row gap-6">
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
