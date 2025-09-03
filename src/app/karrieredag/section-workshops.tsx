import EventCard from "@/components/utils/event-card";

interface Workshop {
  title: string;
  time: string;
  company: string;
  href: string;
}

export default function SectionWorkshops() {
  const workshops: Workshop[] = [
    {
      title: "Software Bill of Materials - Tietoevry",
      time: "12:30 - 13:30",
      company: "Tietoevry Norway AS",
      href: "https://pameldinger.no/e/gszhkv",
    },
    {
      title: "Hvordan skrive en god CV? - Kantega",
      time: "13:45 - 14:45",
      company: "Kantega AS",
      href: "https://pameldinger.no/e/vninkx",
    },
    {
      title: "F# workshop - Frende Forsikring -  Påmelding kommer senere!",
      time: "15:00 - 16:00",
      company: "Frende Forsikring",
      href: "#workshops",
    },
  ];

  return (
    <div className="w-full bg-IXBbg1 py-12" id="workshops">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-start">Workshops</h2>

        <p className="md:w-4/5">
          Under karrieredagene har du mulighet til å delta på flere spennende
          workshops. Her vil du få muligheten til å lære mer om ulike temaer
          innenfor IT som avholdes av ulike bedrifter. Workshopsene varer i 60
          minutter, og det krever at du melder deg på for å delta. Ta en titt på
          de ulike workshopsene under, og meld deg på de du ønsker å delta på.
        </p>

        <p className="font-bold">
          Alle workshops vil avholdes på Troldtog i Grieghallen
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch">
          {workshops.map((workshop, index) => (
            <EventCard
              key={index}
              title={workshop.title}
              date={workshop.time}
              company={workshop.company}
              redirectTo={workshop.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
