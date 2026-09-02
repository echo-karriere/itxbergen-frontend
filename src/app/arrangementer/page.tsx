type Arrangement = {
  navn: string;
  tidspunkt: string;
  sted: string;
  beskrivelse: string;
  pameldingUrl: string;
};

const arrangementer: Arrangement[] = [
  {
    navn: "CV-Workshop med Kantega",
    tidspunkt: "15:00 - 16:00",
    sted: "Troldtog",
    beskrivelse:
      "Få konkrete tips til hvordan du kan gjøre CV-en din tydeligere og mer relevant for arbeidsgivere.",
    pameldingUrl: "https://luma.com/2bcychc8",
  },
  {
    navn: "Bruk AI som en CEO! Med Alf Gunnar Andersen og Erik Bohne",
    tidspunkt: "14:15 - 15:00",
    sted: "Klokkeklang/småtroll",
    beskrivelse:
      "Se hvordan AI kan brukes strategisk og praktisk for å jobbe smartere i hverdagen.",
    pameldingUrl: "https://luma.com/5guztu5r",
  },
];

export default function Arrangementer() {
  return (
    <main className="maxwidth px-6 py-12 md:px-32">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-IXBPurple">
          Karrieredagen 2026
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">
          Meld deg på arrangementer
        </h1>
        <p className="text-lg text-gray-700">
          Velg arrangementet du ønsker å delta på. Trykk på et kort for å gå
          videre til påmelding.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {arrangementer.map((arrangement) => (
          <a
            key={arrangement.navn}
            href={arrangement.pameldingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-l-4 border-gray-200 border-l-IXBPurple bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-IXBPurple hover:shadow-md"
          >
            <p className="text-sm font-bold text-IXBPurple">
              {arrangement.tidspunkt}
            </p>
            <h2 className="mt-2 text-xl font-semibold transition group-hover:text-IXBPurple">
              {arrangement.navn}
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {arrangement.sted}
            </p>
            <p className="mt-3 text-base text-gray-700">
              {arrangement.beskrivelse}
            </p>
            <p className="mt-5 font-bold text-IXBPurple">Meld deg på</p>
          </a>
        ))}
      </section>
    </main>
  );
}
