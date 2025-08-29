import EventCard from "@/components/utils/event-card";

interface Workshop {
  title: string;
  comapny: string;
  time: string;
}

export default function SectionWorkshops() {
  const workshops: Workshop[] = [
    {
      title: "Workshop 1",
      comapny: "Company 1",
      time: "12:30 - 13:30",
    },
    {
      title: "Workshop 2",
      comapny: "Company 2",
      time: "13:30 - 14:30",
    },
    {
      title: "Workshop 3",
      comapny: "Company 3",
      time: "14:30 - 15:30",
    },
  ];

  return (
    <div
      className="maxwidth bg-IXBbg1 text-black h-auto flex flex-col items-start relative pb-12"
      id="workshops"
    >
      <h2 className="text-2xl font-bold text-left mx-4 px-6 mt-12 md:px-32">
        Workshops
      </h2>

      <p className="text-sm mx-4 px-6 mt-4 md:px-32">
        Under karrieredagene har du mulighet til å delta på flere spennende
        workshops. Her vil du få muligheten til å lære mer om ulike temaer
        innenfor IT som avholdes av ulike bedrifter. Workshopsene varer i 60
        minutter, og det krever at du melder deg på for å delta. Ta en titt på
        de ulike workshopsene under, og meld deg på de du ønsker å delta på.
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center md:items-stretch mt-6">
        {workshops.map((workshop, index) => (
          <EventCard
            key={index}
            title={workshop.title}
            date={workshop.time}
            address={workshop.comapny}
            redirectTo="#"
          />
        ))}
      </div>
    </div>
  );
}
