import Image from "next/image";

interface CompanyCardProps {
  companyLogo: string;
}

const CompanyCard = ({ companyLogo }: CompanyCardProps) => {
  return (
    <div className="w-full h-20 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
      <Image
        src={`/karrieredag_participants/${companyLogo}.png`}
        alt={`Logo for ${companyLogo.replace(/\.[^/.]+$/, "")}`}
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
  return (
    <div className="relative w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {(companies || []).map((companyLogo, index) => (
          <CompanyCard key={index} companyLogo={companyLogo} />
        ))}
      </div>
    </div>
  );
}
