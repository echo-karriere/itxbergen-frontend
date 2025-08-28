import HeroImage from "@/components/hero-image";
import ITxButton from "@/components/utils/itx-button";

export default function PageHeader() {
  return (
    <section className="bg-IXBbg2 text-black flex items-center justify-center relative pt-12">
      <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
        {/* Text Content */}
        <div className="flex flex-col justify-center mx-6 md:mx-0 items-start md:w-3/5 text-left space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-IXBPurple">Karrieredag</span> og
            <span className="text-IXBPurple"> nettverking</span> <br /> for
            IT-studenter i Bergen!
          </h1>

          <p className="text-base font-bold md:text-4xl">
            Vi ses 18. September <br /> i Grieghallen, Bergen!
          </p>

          <p className="font-bold">Timeplan kommer i august.</p>
          <div className="flex flex-col space-y-2">
            <ITxButton
              label="Sjekk ut karrieredagen vår"
              variant="primary"
              className="w-[21rem]"
              href="/karrieredag"
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
