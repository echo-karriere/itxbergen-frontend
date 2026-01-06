import HeroImage from "@/components/hero-image";
import ITxButton from "@/components/utils/itx-button";

export default function PageHeader() {
  return (
    <section className="w-full bg-IXBbg2 py-12">
      <div className="maxwidth flex flex-col md:flex-row px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20">
        {/* Text Content */}
        <div className="flex flex-col justify-center md:w-3/5 space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-IXBPurple">Karrieredag</span> og
            <span className="text-IXBPurple"> nettverking</span> <br /> for
            IT-studenter i Bergen!
          </h1>

          <p className="text-xl md:text-xl">
            Neste karrieredag er satt <br></br> <span className="font-bold">17. September 2026 i Grieghallen!</span>
          </p>

          <div className="space-y-2 pl-3 md:pl-0">
            <ITxButton
              label="Sjekk ut karrieredagen vår"
              variant="primary"
              className="w-80"
              href="/karrieredag"
            />
            <ITxButton
              label="Sjekk ut nettverking"
              variant="primary"
              className="w-80"
              href="/nettverking"
            />
          </div>
        </div>

        <HeroImage
          src="/hero/tech-company-amico.svg"
          alt="Illustration of a tech company"
        />
      </div>
    </section>
  );
}
