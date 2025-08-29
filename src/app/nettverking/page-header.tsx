import HeroImage from "@/components/hero-image";
import NavLinks from "@/components/nav-links";
import Breadcrumbs from "@/components/utils/breadcrumbs";

export default function PageHeader() {
  const links = [
    { label: "Studentorganisasjoner og linjeforeninger", href: "#nettverking" },
    { label: "Nyheter", href: "/#nyheter" },
  ];

  return (
    <div className="bg-white text-black flex items-center justify-center relative pt-12">
      <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
        {/* Text Content */}
        <div className="flex flex-col justify-center mx-6 md:mx-0 items-start md:w-3/5 text-left space-y-4 md:space-y-4">
          <Breadcrumbs current="Nettverking" />

          <h1 className="text-3xl md:text-4xl font-bold mb-9">
            <span>Nettverking</span>
          </h1>

          <p className="text-base">
            ITxBergen er opptatt av at studentene skal finne rikelig med
            informasjon som kan fremme deres karriere innen IT.
          </p>

          <p className="text-base">
            På denne siden vil du finne ressurser for IT-studenter, som:
          </p>

          <NavLinks items={links} />
        </div>

        <HeroImage
          src="/hero/pair_programming_amico.svg"
          alt="Illustration of pair programming"
        />
      </div>
    </div>
  );
}
