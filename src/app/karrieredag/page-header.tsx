import NavLinks from "@/components/nav-links";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import InfoCard from "@/components/info-card";

export default function PageHeader() {
  const links = [
    { label: "Timeplan", href: "#timeplan" },
    { label: "Standkart og bedrifter som deltar", href: "#standkart" },
    { label: "Workshops", href: "#workshops" },
    { label: "ITxAfterParty", href: "#afterparty" },
    // { label: "Ekstra informasjon", href: "#extra" },
  ];

  const eventInfo = [
    { label: "Hvor", value: "Grieghallen, Bergen" },
    { label: "Dato", value: "18. september 2025" },
    { label: "Klokkeslett", value: "10:00 - 16:00" },
  ];

  return (
    <div className="w-full bg-white py-12">
      <div className="maxwidth text-black flex flex-col md:flex-row space-y-12 md:space-x-20 px-6 md:px-32 justify-center items-center">
        <div className="flex flex-col md:w-3/5 space-y-4">
          <Breadcrumbs current="Karrieredag" />

          <h1 className="text-3xl md:text-4xl font-bold">
            <span>Karrieredag 2025!</span>
          </h1>

          <p className="text-base">
            Lyst til å bli bedre kjent med dine jobbmuligheter etter studiene?
             Eller kanskje du er på utkikk etter en sommerjobb?
          </p>

          <strong className="text-base">
            Da er ITxBergen sin karrieredag noe for deg!
          </strong>

          <p className="text-base">
            Du er invitert til å delta på ITxBergen sine karrieredager, og vi
            håper du tar turen. Alle som studerer IT samt alle som er
            interessert er velkommen, uansett studieprogram og studiested. Det
            er gratis å delta på karrieredagene!
          </p>

          <h2 className="text-2xl font-bold">
            Oversikt over karrieredagen 2025
          </h2>

          <NavLinks items={links} />
        </div>

        <InfoCard bgColor="bg-IXBbg1">
          {eventInfo.map((item) => (
            <div key={item.label}>
              <p className="text-sm">{item.label}:</p>
              <h2 className="text-lg font-bold">{item.value}</h2>
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  );
}
