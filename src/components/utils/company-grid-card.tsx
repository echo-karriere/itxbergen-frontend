import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Homepages } from "@/lib/company-homepages";

interface CompanyCardProps {
  companyLogo: string;
  label: string;
  href: string,
  external: boolean, 
}

const CompanyCard = ({ companyLogo, href, label }: CompanyCardProps) => {
  const [imageError, setImageError] = useState(false);

  
  const Card = (
  <div className="
      group relative w-full h-20 bg-gray-100 rounded-lg shadow-md
      flex items-center justify-center overflow-hidden
      transition-transform duration-200 ease-in-out
      hover:scale-[1.03] hover:shadow-lg">
    <div className="absolute top-1 left-1 bg-IXBPurple text-white text-xs font-bold px-2 py-1 rounded-md shadow">
          {label}
        </div>

      {!imageError ? (
        <Image
          src={`/karrieredag_participants/${companyLogo}.png`}
          alt={`Logo for ${companyLogo}`}
          width={120}
          height={80}
          className="
          max-w-full max-h-full 
          object-contain 
          transition-transform 
          duration-200 
          ease-in-out
          group-hover:scale-110"
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
  return (
  <Link
    href={href}
    className="block cursor-pointer"
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer noopener" : undefined}>
  
  {Card}
  </Link>
  )
};

export default CompanyCard;
