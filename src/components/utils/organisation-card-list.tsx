import { useState } from "react";
import OrganisationCard from "./organisation-card";

interface OrganisationCardListProps {
  selectedLocation: string;
}


const organisations = [
  { name: 'Cloud', location: 'Høyskolen Kristiania' },
  { name: 'CybVest', location: 'Høyskolen Kristiania' },
  { name: 'Echo', location: 'Universitetet i Bergen' },
  { name: 'Enigma Fintech', location: 'Høgskulen på Vestlandet' },
  { name: 'Enter', location: 'Universitetet i Bergen' },
  { name: 'Helt Sikker', location: 'Universitetet i Bergen' },
  { name: 'Inkogvito', location: 'Universitetet i Bergen' },
  { name: 'ReMIX', location: 'Universitetet i Bergen' },
];


export default function OrganisationCardList({ selectedLocation }: OrganisationCardListProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleSelectCard = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  }

  const filteredOrganisations = selectedLocation === 'Vis alle'
    ? organisations
    : organisations.filter(org => org.location === selectedLocation)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center md:place-items-start">
      {filteredOrganisations.map((organisation, index) => (
        <OrganisationCard
          key={organisation.name}
          name={organisation.name}
          location={organisation.location}
          width="320px"
          height="90px"
          selected={selectedCardIndex === index}
          onSelect={() => handleSelectCard(index)}
        />
      ))}
    </div>
  );
}
