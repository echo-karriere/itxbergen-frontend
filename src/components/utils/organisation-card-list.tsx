import { useState } from "react";
import OrganisationCard from "./organisation-card";

export default function OrganisationCardList() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleSelectCard = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {organisations.map((organisation, index) => (
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
