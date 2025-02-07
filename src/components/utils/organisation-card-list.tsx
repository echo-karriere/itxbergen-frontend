import { useState } from "react";
import OrganisationCard from "./organisation-card";

interface OrganisationCardListProps {
  selectedLocation: string;
  onSelectOrganisation: (name: string | null) => void;
}

const organisations = [
  { name: 'Cloud', location: 'Høyskolen Kristiania' },
  { name: 'CybVest', location: 'Høyskolen Kristiania' },
  { name: 'echo', location: 'Universitetet i Bergen' },
  { name: 'Enigma Fintech', location: 'Høgskulen på Vestlandet' },
  { name: 'Enter', location: 'Universitetet i Bergen' },
  { name: 'Helt Sikker', location: 'Universitetet i Bergen' },
  { name: 'Inkogvito', location: 'Universitetet i Bergen' },
  { name: 'ReMIX', location: 'Universitetet i Bergen' },
];

export default function OrganisationCardList({ selectedLocation, onSelectOrganisation }: OrganisationCardListProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleSelectCard = (index: number, name: string) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
      onSelectOrganisation(null);
    } else {
      setSelectedCardIndex(index);
      onSelectOrganisation(name);
    }
  };

  // Filter the organisations based on selected location
  const filteredOrganisations = selectedLocation === 'Vis alle'
    ? organisations
    : organisations.filter(org => org.location === selectedLocation);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center md:place-items-start">
      {filteredOrganisations.map((organisation, index) => (
        <OrganisationCard
          key={organisation.name}
          name={organisation.name}
          location={organisation.location}
          width="320px"
          height="90px"
          selected={selectedCardIndex === index}
          onSelect={() => handleSelectCard(index, organisation.name)}
        />
      ))}
    </div>
  );
}
