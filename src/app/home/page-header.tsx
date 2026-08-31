import HeroImage from "@/components/hero-image";
import ITxButton from "@/components/utils/itx-button";

export default function PageHeader() {
  return (
    <section className="w-full bg-IXBbg2 py-12">
      <div className="maxwidth flex flex-col md:flex-row px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20">
        {/* Text Content */}
        <div className="flex flex-col justify-center md:w-3/5 space-y-7">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-IXBPurple">Karrieredag</span> og
            <span className="text-IXBPurple"> nettverking</span> <br /> for
            IT-studenter i Bergen!
          </h1>

          <p className="-mt-3 text-lg md:text-xl">
            <span className="font-bold text-IXBPurple">
              17. September 2026 i Grieghallen!
            </span>
          </p>

          <div className="space-y-3 pl-3 md:pl-0">
            <ITxButton
              label="Timeplan"
              variant="primary"
              className="w-80"
              href="/karrieredag#Timeplan"
            /> 
            <ITxButton
              label="Sjekk ut nettverking"
              variant="primary"
              className="w-80"
              href="/nettverking"
            />
            <ITxButton
              label="Meld deg på arrangementer!"
              variant="primary"
              className="w-80"
              href="/arrangementer"
            />
            {/* <ITxButton
              label="Meld deg på Workshop!"
              variant="primary"
              className="w-80"
              href="/karrieredag/priser"
            /> */}
            {/* <ITxButton
              label="Meld deg på AI på scenen!"
              variant="primary"
              className="w-80"
              href="/karrieredag/priser"
            /> */}
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
