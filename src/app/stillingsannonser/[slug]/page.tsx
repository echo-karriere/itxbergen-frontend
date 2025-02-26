"use client";
import { usePathname } from "next/navigation";

interface JobPosting {
  id: number;
  company: string;
  location: string;
  type: string;
  title: string;
  description: string;
}

const jobs: JobPosting[] = [
  {
    id: 2,
    company: "Knowit",
    location: "Bergen",
    type: "Fulltid",
    title: "Nyutdannede utviklere i Bergen 2025",
    description:
      "I Knowit lager vi løsninger som skaper de gode opplevelsene mellom kunde og merkevare. Vi jobber med kunder som Fjordkraft, Fjord Maritime, Storebrand og mange andre.\n\n Vi er Bergens største fagmiljø innen utvikling, men setter tverrfaglighet og samarbeid enda høyere. Hos oss får du jobbe sammen med eksperter innen UX, merkevare, tekst, QA, ledelse, animasjon og en rekke andre fagfelt.\n\n Hvert år ansetter vi over 40 nyutdannede til Bergen eller Oslo. Vi vet hvordan vi skal ta i mot deg, og bygge deg opp som del av et trygt og inkluderende, men samtidig utfordrende miljø.\n Hva forventer vi fra deg?\n\n Du er ferdig med bachelor eller master i løpet av 2025\n Du har en god plattform fra studier, men er først og fremst motivert for å lære og utvikle deg.\nDu ønsker å jobbe i tverrfaglige team\n Du er komfortabel med minst ett programmeringsspråk, men vil gjerne lære flere Alle søknader behandles og besvares. Husk å ta med lenke til karakterer på Vitnemålsportalen.\n Oppstart 18. august 2025.\n Interessert? Send gjerne en søknad allerede i dag.",
  },
];

const Page = () => {
  const id = Number(usePathname().split("/").pop());
  console.log(usePathname());
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return <div>nei</div>;
  }
  return (
    <div>
      <h1>{job.title}</h1>
    </div>
  );
};

export default Page;
