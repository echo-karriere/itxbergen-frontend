"use client";

import { useState } from "react";
import FilterButtonRow from "@/components/utils/filter-button-row";
import ImageGrid from "@/components/utils/karrieredag-image-grid";

type PageKey = "Side1" | "Side2" | "Bankett";

const PAGES: Record<PageKey, { src: string; alt: string }[]> = {
  Side1: Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredag_2024_photos/page1/karrieredag${i + 1}.jpg`,
    alt: `Karrieredag Side 1 - bilde ${i + 1}`,
  })),
  Side2: Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredag_2024_photos/page2/karrieredag${i + 10}.jpg`,
    alt: `Karrieredag Side 2 - bilde ${i + 10}`,
  })),
  Bankett: Array.from({ length: 9 }, (_, i) => ({
    src: `/karrieredag_2024_photos/page3/bankett${i + 1}.jpg`,
    alt: `Karrieredag Bankett - bilde ${i + 1}`,
  })),
};

export default function SectionGallery() {
  const [selectedPage, setSelectedPage] = useState<PageKey>("Side1");
  const pages = Object.keys(PAGES) as PageKey[];
  const images = PAGES[selectedPage];

  return (
    <div className="w-full bg-white py-12">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 items-start space-y-8">
        <h2 className="text-2xl font-bold text-left">
          Se bilder fra Karrieredagen 2024
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
