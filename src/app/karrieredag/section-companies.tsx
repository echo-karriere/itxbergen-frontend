import CompanyGrid from "@/components/utils/company-grid";
import { participatingCompanies } from "@/lib/company-logos";
import Image from "next/image";

export default function SectionCompanies() {
  return (
    <div className="bg-white w-full py-12" id="standkart">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-left">
          Standkart og Bedrifter som deltar
        </h2>

        <div className="flex flex-col md:w-3/5 space-y-4">
          <p></p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/standmap.png"
            alt="Map of stands on karrieredag"
            width={600}
            height={400}
            className="rounded-lg"
            draggable={false}
          />
        </div>
        <CompanyGrid companies={participatingCompanies} />
      </div>
    </div>
  );
}
