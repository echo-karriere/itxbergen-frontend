"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";

type PageKey = "KD Side 1" | "KD Side 2" | "Bankett";

export default function SectionGallery() {
  const [selectedPage, setSelectedPage] = useState<PageKey>("KD Side 1");

  const pages: Record<PageKey, { src: string; alt: string }[]> = {
    "KD Side 1": Array.from({ length: 9 }, (_, i) => ({
      src: `/karrieredag_2024_photos/page1/karrieredag${i + 1}.jpg`,
      alt: `Karrieredag Side 1 - bilde ${i + 1}`,
    })),
    "KD Side 2": Array.from({ length: 9 }, (_, i) => ({
      src: `/karrieredag_2024_photos/page2/karrieredag${i + 10}.jpg`,
      alt: `Karrieredag Side 2 - bilde ${i + 10}`,
    })),
    Bankett: Array.from({ length: 9 }, (_, i) => ({
      src: `/karrieredag_2024_photos/page3/bankett${i + 1}.jpg`,
      alt: `Karrieredag Bankett - bilde ${i + 1}`,
    })),
  };

  return (
    <div className="maxwidth bg-white text-black h-auto flex flex-col items-start relative pb-12">
      <h2 className="text-2xl mx-4 font-bold text-left px-6 md:mt-6 md:px-32">
        Se bilder fra karrieredagen 2024
      </h2>

      {/* Button row */}
      <div className="px-8 md:px-36">
        <div className="flex flex-row md:space-x-12 text-sm pt-8">
          {(Object.keys(pages) as PageKey[]).map((page) => (
            <Button
              key={page}
              variant="ghost"
              className={`hover:underline hover:text-IXBPurple ${
                selectedPage === page ? "text-IXBPurple font-bold" : ""
              }`}
              onClick={() => setSelectedPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <div className="w-full border-t-2 border-black mt-2"></div>
      </div>

      {/* Image Grid */}
      <div className="maxwidth relative w-full px-6 md:px-32 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages[selectedPage].map((img, idx) => (
            <div
              key={idx}
              className="w-full rounded-lg shadow-md flex items-center justify-center overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                className="max-w-full max-h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
