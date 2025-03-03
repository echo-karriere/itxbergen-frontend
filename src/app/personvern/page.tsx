import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-4">Personvernerklæring</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Sist oppdatert: mai 2023</p>

      <section className="mb-8">
        <p>
          Denne personvernerklæringen gir en oversikt over hvordan <strong>ECHO KARRIERE</strong> (org.nr: 924 504 013), heretter
          «vi», «oss», «ITxBERGEN», behandler personopplysninger og hvordan vi tar hensyn til ditt personvern.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Hva er personopplysninger?</h2>
        <p>
          Personopplysninger er informasjon som alene eller sammen med andre opplysninger kan brukes til å identifisere en person.
          Eksempler inkluderer navn, telefonnummer og IP-adresse.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Når samler vi inn personopplysninger?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Du registrerer deg for å delta på arrangementer.</li>
          <li>Du melder deg på vår e-postliste.</li>
          <li>Du kontakter oss via e-post, telefon eller sosiale medier.</li>
          <li>Du søker som styremedlem til ITxBERGEN.</li>
          <li>Melder bedriften på karrieredagene.</li>
          <li>Du besøker våre nettsider.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Behandlingsgrunnlag for personopplysninger</h2>
        <p>
          Vi behandler personopplysninger på grunnlag av <strong>samtykke</strong>, <strong>berettiget interesse</strong> og i noen tilfeller <strong>avtale</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Dine rettigheter</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Tilbaketrekking av samtykke</li>
          <li>Innsyn i egne opplysninger</li>
          <li>Retting av personopplysninger</li>
          <li>Sletting av personopplysninger</li>
          <li>Mulighet til å klage på behandling av personopplysninger</li>
        </ul>
        <p className="mt-4">
          For mer informasjon, besøk{" "}
          <Link
            href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datatilsynet sine nettsider
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Endring av personvernerklæringen</h2>
        <p>
          Om vår behandling av personopplysninger endrer seg, vil vi oppdatere denne personvernerklæringen.
        </p>
      </section>
    </div>
  );
};

