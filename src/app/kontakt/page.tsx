import React from "react";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import Otherthings from "@/components/utils/otherthings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt oss | ITxBergen",
  description:
    "Trenger du å komme i kontakt med oss? Her finner du infomasjon om hvordan du kan kontakte oss.",
};

export default function ContactUs() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black h-auto flex items-center justify-center relative pt-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center md:items-start mx-6 md:mx-0 md:w-3/5 text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs customLast="Kontakt oss" />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Kontakt oss</span>
            </h1>
            <p className="text-base">
              Trenger du å komme i kontakt med oss? Her finner du infomasjon om
              hvordan du kan kontakte oss.
            </p>
            <h2 className="text-2xl font-bold mt-6">E-post</h2>
            For generelle henvendelser, så ber vi deg om å ta kontakt på vår
            felles kontakt e-post:
            <a
              href="mailto:kontakt@itxbergen.no"
              className="text-IXBPurple hover:underline">
              kontakt@itxbergen.no
            </a>
            <h2 className="text-2xl font-bold mt-6">Promotering</h2>
            Ved spørsmål angående promotering, kan du kontakte oss på:
            <a
              href="mailto:promotering@itxbergen.no"
              className="text-IXBPurple hover:underline">
              promotering@itxbergen.no
            </a>
            <h2 className="text-2xl font-bold mt-6">
              Kontakt med et styremedlem direkte
            </h2>
            Du kan også kontakte et styremedlem direkte. Du finner
            kontaktinformasjonen til styremedlemmene under Om ITxBergen siden.
            <h2 className="text-2xl font-bold mt-6">Faktura</h2>
            Har du spørsmål om faktura? Da kan du kontakte vår økonomiansvarlig.
            Du finner nåværende økonomiansvarlig under Om ITxBergen siden. Det
            samme gjelder om du har en faktura til oss. Vårt organisasjonsnummer
            er 924 504 013, og organisasjonens juridiske navn er ITXBERGEN.
            <h2 className="text-2xl font-bold mt-6">Postadresse</h2>
            Skal du sende oss noe i posten? Send det til: <br />
            ITxBERGEN <br />
            Postboks 7803 <br />
            5020 BERGEN <br />
            Norway
          </div>
        </div>
      </div>
      <Otherthings />
    </div>
  );
}
