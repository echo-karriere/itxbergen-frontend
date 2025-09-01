import EventCard from "@/components/utils/event-card";

interface Workshop {
  comapny: string;
  time: string;
  location: string;
}

export default function SectionWorkshops() {
  const workshops: Workshop[] = [
    {
      comapny: "Tietoevry Norway AS",
      time: "12:30 - 13:30",
      location: "Troldtog",
    },
    {
      comapny: "Kantega AS",
      time: "13:30 - 14:30",
      location: "Troldtog",
    },
    {
      comapny: "Frende Forsikring",
      time: "14:30 - 15:30",
      location: "Troldtog",
    },
  ];

  return (
    <div className="w-full bg-IXBbg1 py-12" id="workshops">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-start">Workshops</h2>

        <p>
          Under karrieredagene har du mulighet til å delta på flere spennende
          workshops. Her vil du få muligheten til å lære mer om ulike temaer
          innenfor IT som avholdes av ulike bedrifter. Workshopsene varer i 60
          minutter, og det krever at du melder deg på for å delta. Ta en titt på
          de ulike workshopsene under, og meld deg på de du ønsker å delta på.
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
          {workshops.map((workshop, index) => (
            <EventCard
              key={index}
              title={workshop.comapny}
              date={workshop.time}
              address={workshop.location}
              redirectTo="#"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
