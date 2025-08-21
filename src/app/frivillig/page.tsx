import Breadcrumbs from "@/components/utils/automatic-breacrumbs";

const Page = () => {
  return (
    <>
      <div className="justify-center">
        <div className="maxwidth md:pt-[4.5rem] pt-4 px-[1.8rem] md:px-32">
          <Breadcrumbs />
          <h1 className="text-3xl md:text-4xl font-bold pb-8 pt-4">
            <span>Vi søker frivillige til Karrieredag!</span>
          </h1>

          <div className="flex flex-col md:flex-row pb-14">
            <div className="md:w-[60%] md:mr-3 w-[80%]">
              Vi søker frivillige!
              <br /><br />
              Som frivillig får du en unik mulighet til å møte de hyggelige medlemmene i ITxBergen og å finne ut om en rolle som styremedlem kunne være noe for deg. Arrangementet er også en fin anledning til å nettverke med representanter fra ulike bedrifter og til å vise frem din engasjement og vilje til å yte en ekstra innsats.
              <br /><br />
              Ulike arbeidsoppgaver kan være å ta imot studentene, bistå bedrifter med diverse spørsmal, veilede studenter og bedrifter dit de skal og andre mindre oppgaver. Frivillige får også billett til gallaen.
              <br /><br />
              Kunne dette vært noe for deg? Søk da vel!
            </div>

            <a href="https://airtable.com/appINI0wTszNC2Dvn/paggoqSKuopAgjwmc/form">
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
