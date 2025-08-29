import { useState } from "react";
import StudentOrganisationCard from "./student-organisation-card";
import { studentOrganisations } from "@/lib/student-organisations";
import { StudentOrganisation } from "@/types/student-organisation";

interface StudentOrganisationCardListProps {
  selectedLocation: string;
  onSelectOrganisation: (organisation: StudentOrganisation | null) => void;
}

export default function StudentOrganisationCardList({
  selectedLocation,
  onSelectOrganisation,
}: StudentOrganisationCardListProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const handleSelectCard = (
    index: number,
    organisation: StudentOrganisation,
  ) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
      onSelectOrganisation(null);
    } else {
      setSelectedCardIndex(index);
      onSelectOrganisation(organisation);
    }
  };

  const filteredOrganisations: StudentOrganisation[] =
    selectedLocation === "Vis alle"
      ? studentOrganisations
      : studentOrganisations.filter((org) => org.location === selectedLocation);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:place-items-start w-full pt-6">
      {filteredOrganisations.map((organisation, index) => (
        <StudentOrganisationCard
          key={organisation.name}
          name={organisation.name}
          location={organisation.location}
          width="320px"
          height="90px"
          selected={selectedCardIndex === index}
          onSelect={() => handleSelectCard(index, organisation)}
        />
      ))}
    </div>
  );
}
