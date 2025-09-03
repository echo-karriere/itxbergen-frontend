import CompanyGrid from "@/components/utils/company-grid";
import StandMap from "@/components/utils/standmap";
import {
  participatingCompanies,
  participatingStartups,
} from "@/lib/company-logos";

export default function SectionCompanies() {
  return (
    <div className="bg-white w-full py-12" id="standkart">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-left">
          Standkart på karrieredag
        </h2>

        <div className="flex flex-col md:w-3/5 space-y-4">
          <p></p>
        </div>

        <StandMap
          companies={participatingCompanies}
          startups={participatingStartups}
          mapImage="standkart.svg"
        />

        <h2 className="text-2xl font-bold text-left">Bedrifter som deltar</h2>

        <CompanyGrid companies={participatingCompanies} />

        <h2 className="text-2xl font-bold text-left">Startups som deltar</h2>

        <CompanyGrid companies={participatingStartups} />
      </div>
    </div>
  );
}
