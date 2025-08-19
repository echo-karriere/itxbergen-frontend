import Breadcrumbs from "@/components/utils/automatic-breacrumbs";

const Page = () => {
  return (
    <>
      <div className="justify-center">
        <div className="maxwidth md:pt-[4.5rem] pt-4 px-[1.8rem] md:px-32">
          <Breadcrumbs />
          <h1 className="text-3xl md:text-4xl font-bold pb-8 pt-4">
            <span>Bli en del av ITxBergen – Vi søker nye styremedlemmer!</span>
          </h1>

          <div className="flex flex-col md:flex-row pb-14">
            <div className="md:w-[60%] md:mr-3 w-[80%]">
              <p className="pb-4">
                ITxBergen er en frivillig studentorganisasjon som arrangerer
                karrieredag årlig for alle IT-studenter i Bergen. I tillegg
                gjennomfører vi flere mindre arrangementer gjennom året for å
                skape gode møteplasser mellom studenter og bedrifter.
              </p>
              <p>
                Vi består av engasjerte studenter fra ulike IT-studier på tvers
                av byens utdanningsinstitusjoner – og nå ser vi etter nye
                medlemmer til styret!
              </p>
              <h2 className="text-2xl font-bold pt-8 pb-4">
                Hvorfor bør du søke?
              </h2>
              <p>
                Ett styreverv i ITxBergen gir deg en unik mulighet til å utvide
                nettverket ditt, møte nye mennesker og få verdifull erfaring med
                organisering og samarbeid. Du vil få innsikt i bransjen samt
                muligheter til å knytte verdifulle forbindelser som kan være
                nyttige for din fremtidige karriere. I tillegg byr rollen på
                spennende utfordringer, hvor du får utviklet ferdigheter
                innenfor alt fra planlegging og kommunikasjon til design og
                teknisk arbeid.
              </p>
              <h2 className="pt-5">Våre styreverv inkluderer:</h2>
              <ul className="pb-5">
                <li>- Leder</li>
                <li>- Nestleder</li>
                <li>- Kontaktansvarlig</li>
                <li>- Økonomiansvarlig</li>
                <li>- Økonomiassistent</li>
                <li>- Bedriftsansvarlig</li>
                <li>- Bedriftsassistenter</li>
                <li>- Webansvarlig</li>
                <li>- Webassistenter</li>
                <li>- Grafiker/UX-designer</li>
                <li>- PR-ansvarlig</li>
                <li>- PR-assistent</li>
                <li>- Styremedlemmer</li>
              </ul>
              <p>
                Ønsker du å bli en del av et sosialt og faglig utviklende miljø?
                Da vil vi gjerne høre fra deg!
              </p>
              <p>
                Har du spørsmål? Ved generelle hendvendelser ta kontakt med
                styret på{" "}
                <a
                  href="mailto:kontakt@itxbergen.no"
                  className="text-blue-400 hover:underline"
                >
                  kontakt@itxbergen.no
                </a>
                , ved andre henvendelser til leder på{" "}
                <a
                  href="mailto:fredric.hegland@itxbergen.no"
                  className="text-blue-400 hover:underline"
                >
                  fredric.hegland@itxbergen.no
                </a>
                .
              </p>
              <p className="pt-8"> Vi gleder oss til å høre fra deg!</p>
            </div>

            <a href="https://airtable.com/app8IBcRX0mrtDtcF/pagnoEQgjFYyVPNB9/form">
              <div className="bg-IXBbg1 shadow-md w-40 h-14 rounded text-sm flex items-center justify-center my-3">
                Gå til søknad <i className="ri-external-link-fill ml-2" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
