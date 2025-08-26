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
              Er du en av de frivillige som ønsker å hjelpe oss under Karrieredagen 2025?🤩
              <br />
              <br />
              Vi i ITxBergen ser etter engasjerte og imotekommende studenter som kan assistere oss den 18.september i forbindelse med karrieredagen.<br />
              Dere vil bli bedt om å være tilgjengelige for å veilede studentene og bedriftene med hvor de skal og besvare eventuelle spørsmål. Mer informasjon vil bli gitt til de utvalgte i forkant av arrangementet.<br />
              Som takk for at dere vil stille som frivillige, ønsker vi i itxbergen a sikre dere en billett til banketten 🎉<br /><br />
              Ikke nøl med å søke! vi gleder oss til å bli bedre kjent med dere. Søknadsskjema finner du på nettsiden vår.
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
