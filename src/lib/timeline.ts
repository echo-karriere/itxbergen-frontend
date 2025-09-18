export interface TimelineItem {
  title: string;
  time: string;
  description: string;
  address?: string;
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
    description:
      "Hør fra profiler som representerer ulike retninger innenfor IT. Her blir det presenteret ulike erfaringer og arbeidsoppgaver. Paneldebatt ledes av Thomas Teige",
    address: "Paneldebatten vil bli avholdt på Klokkeklang",
  },
  {
    title: "Besøk bedriftene på stand",
    time: "11:30 - 16:00",
    description:
      "Stikk innom bedriftenes stands for å stille spørsmål og utforske mulighetene som finnes for deg. I løpet av denne tiden kan du også delta på workshops og konseptpresentasjoner. For mer informasjon og for å melde deg på workshops og presentasjoner (som finner sted i 3. etasje), sjekk lenkene nedenfor.",
  },
  {
    title: "Workshop 1 - Software Bill of Materials",
    time: "12:30 - 13:30",
    description: "Workshop med Tietoevry Norway AS",
    address: "Workshop 1 vil bli avholdt på Troldtog",
  },
  {
    title: "Workshop 2 - Hvordan skrive en god CV?",
    time: "13:45 - 14:45",
    description: "Workshop med Kantega AS",
    address: "Workshop 2 vil bli avholdt på Troldtog",
  },
  {
    title: "Workshop 3 - F#-workshop",
    time: "15:00 - 16:00",
    description: "Workshop med Frende Forsikring",
    address: "Workshop 3 vil bli avholdt på Troldtog",
  },
];

export const gallaAfterPartyTimeline: TimelineItem[] = [
  {
    title: "ITxGalla",
    time: "19:00 - 22:00",
    description:
      "Studenter som gir et positivt inntrykk av seg selv på karrieredagene kan kanskje være heldige i å få tak i en gullbillett til etterfesten. Mer informasjon gis til de heldige som får gullbillett. Adresse: Nygaten 7, 5017 Bergen",
    address: "Adresse: Nygaten 7, 5017 Bergen",
  },
  {
    title: "ITxAfterParty",
    time: "22:00 - 1:30",
    description:
      "Etter en dag med mange, givende samtaler med spennende bedrifter, trenger ikke minglingen ta slutt der! Meld deg på kveldens event og skap relasjoner i en litt mer avslappet setting. Dette er et helt nytt konsept som åpner dørene for alle studenter, også for dere som ikke har gullbillett til den tradisjonelle gallaen. Sikre deg en plass allerede i dag! Link til påmelding finner du i rett under!",
    address: "Adresse: Nygaten 7, 5017 Bergen",
  },
];
