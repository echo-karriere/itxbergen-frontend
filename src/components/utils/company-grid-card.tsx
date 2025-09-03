import { useState } from "react";
import Image from "next/image";

interface CompanyCardProps {
  companyLogo: string;
  label: string;
}

const CompanyCard = ({ companyLogo, label }: CompanyCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-20 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
      <div className="absolute top-1 left-1 bg-IXBPurple text-white text-xs font-bold px-2 py-1 rounded-md shadow">
        {label}
      </div>

      {!imageError ? (
        <Image
          src={`/karrieredag_participants/${companyLogo}.png`}
          alt={`Logo for ${companyLogo}`}
          width={120}
          height={80}
          className="max-w-full max-h-full object-contain"
          draggable={false}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-gray-700 font-semibold text-sm text-center px-2">
          {companyLogo}
        </span>
      )}
    </div>
  );
};

export default CompanyCard;
