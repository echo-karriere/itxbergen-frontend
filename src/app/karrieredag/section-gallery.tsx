"use client";

import { useState } from "react";
import FilterButtonRow from "@/components/utils/filter-button-row";
import ImageGrid from "@/components/utils/karrieredag-image-grid";

type PageKey = "2025" | "2023" | "2022";

const PAGES: Record<PageKey, { src: string; alt: string }[]> = {
  "2025": Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredager_photos/karrieredag_2025_photos/KD_2025_${i + 1}.jpg`,
    alt: `Karrieredag 2025 - bilde ${i + 1}`,
  })),
  "2023": Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredager_photos/karrieredag_2023_photos/KD_2023_${i + 1}.jpg`,
    alt: `Karrieredag 2023 - bilde ${i + 1}`,
  })),
  "2022": Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredager_photos/karrieredag_2022_photos/KD_2022_${i + 1}.jpg`,
    alt: `Karrieredag 2022 - bilde ${i + 1}`,
  })),
};

export default function SectionGallery() {
  const [selectedPage, setSelectedPage] = useState<PageKey>("2025");
  const pages = Object.keys(PAGES) as PageKey[];
  const images = PAGES[selectedPage];

  return (
    <div className="w-full bg-white py-12">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 items-start space-y-8">
        <h2 className="text-2xl font-bold text-left">
          Se bilder fra tidligere karrieredager
        </h2>

        <FilterButtonRow
          buttons={pages}
          selectedButton={selectedPage}
          onSelect={setSelectedPage}
        />

        <ImageGrid images={images} />
      </div>
    </div>
  );
}
