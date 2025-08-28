import HeroImage from "@/components/hero-image";
import NavLinks from "@/components/nav-links";
import Breadcrumbs from "@/components/utils/breadcrumbs";

export default function PageHeader() {
  const links = [
    { label: "Timeplan", href: "#" },
    { label: "Standkart og bedrifter som deltar", href: "#" },
    { label: "Workshops", href: "#" },
    { label: "Ekstra informasjon", href: "#" },
  ];

  return (
    <div className="white text-black flex items-center justify-center relative pt-12">
      <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-start mx-6 md:mx-0 md:w-3/5 text-left space-y-4 md:space-y-4">
          <Breadcrumbs current="Karrieredag" />

          <h1 className="text-3xl md:text-4xl font-bold mb-9">
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

        <HeroImage
          src="/hero/public_speaker_amico.svg"
          alt="Illustration of a public speaker"
        />
      </div>
    </div>
  );
}
