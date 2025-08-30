import CompanyGrid from "@/components/utils/company-grid";
import { participatingCompanies } from "@/lib/company-logos";

export default function SectionCompanies() {
  return (
    <div className="bg-white w-full py-12">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-left">
          Standkart og Bedrifter som deltar
        </h2>

        <CompanyGrid companies={participatingCompanies} />
      </div>
    </div>
  );
}
