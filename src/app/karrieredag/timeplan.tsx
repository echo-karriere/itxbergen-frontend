type Timeplan = {
  navn: string;
  tid: string;
  sted: string;
  beskrivelse: string;
  link?: string;
};


const hendelser_KD: Timeplan[] = [
  {
    navn: "Dørene åpner",
    tid: "09:30 - 10:00",
    sted: "Inngangen",
    beskrivelse: "Dørene åpner!",
  },
  {
    navn: "Ballongslipp",
    tid: "10:00 - 10:15",
    sted: "Foaje Peer Gynt",
    beskrivelse: "Offisiell åpning av Karrieredagen med ballongslipp og mulighet til å vinne kule premier, blant annet AirPods!",
  },
  {
    navn: "Lynpresentasjoner",
    tid: "10:15 - 11:30",
    sted: "Klokkeklang/småtroll",
    beskrivelse: "Bedriftene holder korte spennede presentasjoner",
  },
  {
    navn: "Standområdet",
    tid: "11:30 - 16:00",
    sted: "Per Gynt salen (+ Foaje 1+2)",
    beskrivelse: "Kom å besøk de ulike bedriftene på stand!",
  },
  {
    navn: "Workshop med Tieto",
    tid: "12:30 - 13:30",
    sted: "Troldtog",
    beskrivelse: "Workshop med Tieto.",
  },
  {
    navn: "Workshop med Norges Bank",
    tid: "13:45 - 14:45",
    sted: "Troldtog",
    beskrivelse: "Workshop med Norges Bank.",
  },
    {
    navn: "AI på scenen",
    tid: "14:15 - 15:00",
    sted: "Klokkeklang/småtroll",
    beskrivelse: "Se hvordan Erik Nymo Bohne effektiviserer arbeidshverdagen til Alf Gunnar Andersen med smarte AI-løsninger i en live workshop.",
    link: "https://luma.com/5guztu5r"
},
  {
    navn: "CV-workshop med Kantega",
    tid: "15:00 - 16:00",
    sted: "Troldtog",
    beskrivelse: "Kantega deler sine erfaringer om hvordan du kan løfte frem det unike med nettopp deg på CV-en din",
    link: "https://luma.com/2bcychc8"
  },
];

const hendelser_Galla: Timeplan[] = [
  {
    navn: "Galla",
    tid: "19:00",
    sted: "Zander Kaaes gate 6 ",
    beskrivelse: "Få muligheten til å være med en bedrift på gallaen, dersom du er heldig og kaprer deg en billett!",
  },
];

function TimeplanKort({ item }: { item: Timeplan }) {
  const isClickable = Boolean(item.link);

  const cardClassName = `
    rounded-lg border border-gray-200 border-l-4 bg-white p-5 shadow-sm
    ${
      isClickable
        ? "border-l-IXBPurple cursor-pointer transition hover:-translate-y-1 hover:border-IXBPurple hover:shadow-md"
        : "border-l-gray-200"
    }
  `;

  const content = (
    <div className="grid gap-4 md:grid-cols-[9rem_1fr] md:items-center md:gap-8">
      <p className="w-fit rounded-full bg-IXBbg2 px-4 py-2 text-sm font-bold text-IXBPurple md:w-full md:text-center">
        {item.tid}
      </p>

      <div className="space-y-2">
        <h2
          className={`text-xl font-semibold ${
            isClickable ? "group-hover:text-IXBPurple" : ""
          }`}
        >
          {item.navn}
        </h2>

        <p className="text-sm font-medium text-gray-600">{item.sted}</p>
        <p className="text-base text-gray-700">{item.beskrivelse}</p>

        {isClickable && (
          <p className="font-bold text-IXBPurple">
            Meld deg på!
          </p>
        )}
      </div>
    </div>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClassName} group block`}
      >
        {content}
      </a>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

export default function LagTimeplan() {
  return (
    <section id="Timeplan">
    <main className="maxwidth px-6 py-12 md:px-32">
      <h1 className="mb-8 text-3xl font-bold">Timeplan for karrieredagen</h1>


      <section className="space-y-4">
        {hendelser_KD.map((item) => (
          <TimeplanKort key={`${item.tid}-${item.navn} ${item.link}`} item={item} />
        ))}
      </section>

      <h1 className="mb-8 mt-16 text-3xl font-bold">Galla</h1>
      <section className="space-y-4">
        {hendelser_Galla.map((item) => (
          <TimeplanKort key={`${item.tid}-${item.navn}`} item={item} />
        ))}
      </section>
    </main>
    </section>
  );
}
