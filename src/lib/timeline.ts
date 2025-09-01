interface TimelineItem {
  title: string;
  time: string;
  description: string;
  overlap?: boolean;
}

export const karrieredagTimeline: TimelineItem[] = [
  {
    title: "Dørene åpner for studenter",
    time: "09:30 - 10:00",
    description: "",
  },
  {
    title: "Ballongslipp",
    time: "10:00 - 10:15",
    description:
      "Vi starter karrieredagen med et ballongslipp, og noen av ballongene inneholder premier! Sørg for å være til stede innen kl. 10:00 for å bli med. Hvem vet, kanskje du er en av de heldige vinnerne!",
  },
  {
    title: "Lynpresentasjoner",
    time: "10:15 - 11:30",
    description:
      "Nysgjerrig på hvilke bedrifter som deltar på karrieredagen? Delta på lynpresentasjonene for en rask introduksjon til noen av bedriftene som er til stede.",
  },
  {
    title: "Paneldebatt",
    time: "11:30 - 12:15",
    description: "",
    overlap: true,
  },
  {
    title: "Besøk bedriftene på stand",
    time: "11:30 - 16:00",
    description:
      "Stikk innom bedriftenes stands for å stille spørsmål og utforske mulighetene som finnes for deg. I løpet av denne tiden kan du også delta på workshops og konseptpresentasjoner. For mer informasjon og for å melde deg på workshops og presentasjoner (som finner sted i 3. etasje), sjekk lenkene nedenfor.",
    overlap: true,
  },
  {
    title: "Workshop 1",
    time: "12:30 - 13:30",
    description: "Workshop med Tietoevry Norway AS",
  },
  {
    title: "Workshop 2",
    time: "13:30 - 14:30",
    description: "Workshop med Kantega AS",
  },
  {
    title: "Workshop 3",
    time: "14:30 - 15:30",
    description: "Workshop med Frende Forsikring",
  },
];
