import { useState } from "react";
import OrganisationCard from "./organisation-card";
import { organisations } from "@/lib/organisations"; // Ensure this file includes boxHeader, boxp1, boxp2

interface OrganisationCardListProps {
  selectedLocation: string;
  onSelectOrganisation: (organisation: any | null) => void;
}

export default function OrganisationCardList({
  selectedLocation,
  onSelectOrganisation,
}: OrganisationCardListProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const handleSelectCard = (index: number, organisation: any) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
      onSelectOrganisation(null);
    } else {
      setSelectedCardIndex(index);
      onSelectOrganisation(organisation);
    }
  };

  const filteredOrganisations =
    selectedLocation === "Vis alle"
      ? organisations
      : organisations.filter((org) => org.location === selectedLocation);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:place-items-start">
      {filteredOrganisations.map((organisation, index) => (
        <OrganisationCard
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
