"use client";

import { useMemo } from "react";
import CompanyGridCard from "./company-grid-card";
import { Homepages } from "@/lib/company-homepages";

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
          <CompanyGridCard
            key={index}
            companyLogo={company.companyLogo}
            label={company.label}
            href={Homepages[company.companyLogo]}
            external
          />
        ))}
      </div>
    </div>
  );
}
