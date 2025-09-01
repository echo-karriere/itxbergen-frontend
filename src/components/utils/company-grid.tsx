import Image from "next/image";
import { useMemo } from "react";

interface CompanyCardProps {
  companyLogo: string;
  label: string;
}

const CompanyCard = ({ companyLogo, label }: CompanyCardProps) => {
  return (
    <div className="relative w-full h-20 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
      {/* Index / Label Badge */}
      <div className="absolute top-1 left-1 bg-IXBPurple text-white text-xs font-bold px-2 py-1 rounded-md shadow">
        {label}
      </div>

      <Image
        src={`/karrieredag_participants/${companyLogo}.png`}
        alt={`Logo for ${companyLogo}`}
        width={120}
        height={80}
        className="max-w-full max-h-full object-contain"
        draggable={false}
      />
    </div>
  );
};

interface CompanyGridProps {
  companies: string[];
}

export default function CompanyGrid({ companies }: CompanyGridProps) {
  const labeledCompanies = useMemo(() => {
    let slCounter = 1;

    return companies.map((companyLogo, index) => {
      if (companyLogo === "startup_lab") {
        const label = `SL${slCounter}`;
        slCounter++;
        return { companyLogo, label };
      }
      return { companyLogo, label: `${index + 1}` };
    });
  }, [companies]);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {labeledCompanies.map((company, index) => (
          <CompanyCard
            key={index}
            companyLogo={company.companyLogo}
            label={company.label}
          />
        ))}
      </div>
    </div>
  );
}
