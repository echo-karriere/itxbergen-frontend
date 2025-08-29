import Image from "next/image";
import { companyLogos } from "@/lib/company-logos";

export default function SectionCompanies() {
  return (
    <div className="maxwidth bg-white text-black h-auto flex flex-col items-start relative pb-12">
      {/* Header */}
      <h2 className="text-2xl font-bold text-left mx-4 px-6 mt-12 md:px-32">
        Bedrifter som har deltatt på karrieredagene våres
      </h2>

      {/* Company Grid */}
      <div className="relative w-full px-6 md:px-32 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {(companyLogos || []).map((company, index) => (
            <div
              key={index}
              className="w-full h-20 bg-gray-100 rounded-lg shadow-md flex items-center justify-center overflow-hidden"
            >
              <Image
                src={`/karrieredag_participants/${company}`}
                alt={`Logo for ${company.replace(/\.[^/.]+$/, "")}`}
                width={120}
                height={80}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
