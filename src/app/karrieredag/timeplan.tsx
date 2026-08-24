type Timeplan = {
  navn: string;
  tid: string;
  sted: string;
  beskrivelse: string;
};


const hendelser_KD: Timeplan[] = [
  {
    navn: "Dørene åpner",
    tid: "09:30 - 10:00",
    sted: "Inngangen",
    beskrivelse: "Dørene åpner for alle studenter.",
  },
  {
    navn: "Ballongslipp",
    tid: "10:00 - 10:15",
    sted: "Foaje Peer Gynt",
    beskrivelse: "Offisiell åpning av karrieredagen med ballongslipp.",
  },
  {
    navn: "Lynpresentasjoner",
    tid: "10:15 - 11:30",
    sted: "Klokkeklang/småtroll",
    beskrivelse: "Bedriftene holder korte presentasjoner for studentene.",
  },
  {
    navn: "AI-foredrag",
    tid: "11:30 - 12:15",
    sted: "Klokkeklang/småtroll",
    beskrivelse: "Foredrag om kunstig intelligens.",
  },
  {
    navn: "Standområdet",
    tid: "11:30 - 16:00",
    sted: "Per Gynt salen (+ Foaje 1+2)",
    beskrivelse: "Studentene kan besøke stands og møte bedriftene.",
  },
  {
    navn: "Workshop 1",
    tid: "12:30 - 13:30",
    sted: "Troldtog",
    beskrivelse: "Workshop med Tieto.",
  },
  {
    navn: "Workshop 2",
    tid: "13:45 - 14:45",
    sted: "Troldtog",
    beskrivelse: "Workshop med Norges Bank.",
  },
  {
    navn: "Workshop 3",
    tid: "15:00 - 16:00",
    sted: "Troldtog",
    beskrivelse: "Workshop med Kantega.",
  },
];

const hendelser_Galla: Timeplan[] = [
  {
    navn: "Galla og Afterparty",
    tid: "19:00",
    sted: "Zander Kaaes gate 6 ",
    beskrivelse: "Galla og afterparty med bedriftene",
  },
];

function TimeplanKort({ item }: { item: Timeplan }) {
  return (
    <article className="rounded-lg border border-gray-200 border-l-4 border-l-IXBPurple bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <p className="w-fit rounded-full bg-IXBbg2 px-4 py-2 text-sm font-bold text-IXBPurple md:w-36 md:text-center">
          {item.tid}
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{item.navn}</h2>

          <p className="text-sm font-medium text-gray-600">{item.sted}</p>

          <p className="text-base text-gray-700">{item.beskrivelse}</p>
        </div>
      </div>
    </article>
  );
}

export default function LagTimeplan() {
  return (
    <main className="maxwidth px-6 py-12 md:px-32">
      <h1 className="mb-8 text-3xl font-bold">Timeplan for karrieredagen</h1>

      <section className="space-y-4">
        {hendelser_KD.map((item) => (
          <TimeplanKort key={`${item.tid}-${item.navn}`} item={item} />
        ))}
      </section>

      <h1 className="mb-8 mt-16 text-3xl font-bold">Galla og Afterparty</h1>
      <section className="space-y-4">
        {hendelser_Galla.map((item) => (
          <TimeplanKort key={`${item.tid}-${item.navn}`} item={item} />
        ))}
      </section>
    </main>
  );
}
