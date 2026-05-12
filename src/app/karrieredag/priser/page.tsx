import Breadcrumbs from "@/components/utils/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Priser for karrieredagen | ITxBergen",
  description: "Priser og pakkelosninger for karrieredagen 2026",
};

const packages = [
  {
    name: "Grunnpakke",
    type: "Obligatorisk",
    price: "15 000 kr",
    secondaryPrice: "6 000 kr for offentlig/startup",
    description:
      "Grunnpakken er obligatorisk for alle deltakende bedrifter.",
    items: [
      "Standplass 3x3 m (9 m2) inkludert 1 bord, 2 stoler og grenuttak",
      "Lynpresentasjon (3 minutter), forbeholdt de første 19 påmeldte",
      "Mulighet for lynintervju med studenter",
    ],
  },
  {
    name: "Workshop",
    type: "Tilleggspakke",
    price: "7 000 kr",
    description:
      "60 minutters workshop med studenter, forbeholdt de forste 3 påmeldte.",
    items: [
      "Bedriften bestemmer tema, format og agenda",
      "Kan gjennomføres som case-arbeid, faglig innlegg eller teknisk økt",
      "ITxBergen stiller med rom og standard presentasjonsutstyr",
    ],
  },
  {
    name: "ITxGalla",
    type: "Tilleggspakke",
    price: "20 000 kr",
    description: "Avholdes pa Galleri Nygaten den 17. september.",
    items: [
      "Inkluderer 3-retters middag, 3 drikkeenheter og 1 aperitiff",
      "Bedriftene sitter tett på studenter og representanter fra andre virksomheter",
      "En sosial avslutning på karrieredagen med afterparty",
    ],
  },
];

export default function KarrieredagPriser() {
  return (
    <main className="w-full bg-white">
      <section className="w-full bg-IXBbg2 py-12 shadow">
        <div className="maxwidth px-6 md:px-32">
          <Breadcrumbs current="Priser" />

          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-wide text-IXBPurple">
              Karrieredagen 2026
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              Priser og pakkeløsninger
            </h1>
            <p className="text-lg">
              Her finner du en oversikt over prisene for bedrifter som
              ønsker å delta på karrieredagen i Grieghallen 17. september
              2026.
            </p>
          </div>
        </div>
      </section>

      <section className="maxwidth px-6 py-12 md:px-32">
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((packageItem) => (
            <article
              key={packageItem.name}
              className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-wide text-IXBPurple">
                  {packageItem.type}
                </p>
                <h2 className="text-2xl font-bold">{packageItem.name}</h2>
                <div>
                  <p className="text-3xl font-bold text-IXBbg">
                    {packageItem.price}
                  </p>
                  {packageItem.secondaryPrice && (
                    <p className="mt-1 text-base font-semibold text-IXBPurple">
                      {packageItem.secondaryPrice}
                    </p>
                  )}
                </div>
                <p className="text-base">{packageItem.description}</p>
              </div>

              <ul className="mt-6 space-y-3 text-base">
                {packageItem.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-IXBPurple" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-IXBbg2 p-6">
          <p className="font-semibold">
            Alle priser er oppgitt uten mva. Vilkår for offentlige bedrifter og
            startup finnes på påmeldingssiden.
          </p>
        </div>
      </section>
    </main>
  );
}
