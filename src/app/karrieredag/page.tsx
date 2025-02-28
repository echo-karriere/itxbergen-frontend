"use client";

import Image from "next/image";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import ButtonIXB from "@/components/utils/button-ixb";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { companyLogos } from "@/lib/organisations";
import { useRouter } from "next/navigation";

export default function Karrieredag() {
  const [selectedPage, setSelectedPage] = useState("KD Side 1");
  const router = useRouter();

  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-black flex items-center justify-center relative pt-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Karrieredag</span>
            </h1>
            <p className="text-base">
              Karrieredagen i 2024 ble en suksess! Den ble avholdt den 19.
              september i Grieghallen. Vi har allerede startet planleggingen av
              karrieredagen 2025!
            </p>
            <p className="text-base">
              På denne siden vil du finne ressurser til neste karrieredag, som:
            </p>
            <ul className="text-base space-y-2 md:pl-8">
              {[
                "Timeplan",
                "Standkart og bedrifter som deltar",
                "Workshops",
                "Konseptpresentasjoner",
                "Ekstra informasjon",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/public_speaker_amico.png"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Wave separator at the top */}
      <div>
        <Image
          src="/wave_top_dark.svg"
          alt="Wave Top"
          layout="intrinsic"
          width={1920}
          height={1080}
          className="bg-IXBbg2 w-full"
          draggable={false}
        />
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg text-white flex items-center justify-center relative">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col items-center text-center z-20 py-10">
          {/* Header */}
          <h2 className="text-3xl font-bold text-IXBfg px-6">
            Ønsker du mer informasjon om Karrieredagen?
          </h2>
          {/* Buttons Below Text */}
          <div className="flex space-x-4 md:space-x-20 mt-12">
            <ButtonIXB
              label="  For Studenter  "
              variant="ghost"
              onClick={() => router.push("karrieredag/studenter")}
            />
            <ButtonIXB
              label="  For Bedrifter  "
              variant="ghost"
              onClick={() => router.push("karrieredag/bedrifter")}
            />
          </div>
        </div>
      </div>
      {/* Wave separator at the bottom */}
      <div>
        <Image
          src="/wave_bottom_dark.svg"
          alt="Wave Top"
          layout="intrinsic"
          className="w-full"
          width={1920}
          height={1080}
          draggable={false}
        />
      </div>
      {/* Section 3 */}
      <div className="maxwidth bg-white text-black h-auto flex flex-col items-start relative">
        {/* Header 1 */}
        <h2 className="text-2xl font-bold text-left px-6 md:mt-6 md:px-32">
          Se bilder fra karrieredagen 2024
        </h2>

        {/* Button row */}
        <div className="px-8 md:px-36">
          <div className="flex flex-row md:space-x-12 text-sm pt-8">
            {["KD Side 1", "KD Side 2", "Bankett"].map((page) => (
              <Button
                key={page}
                variant="ghost"
                className={`hover:underline hover:text-IXBPurple ${selectedPage === page ? "text-IXBPurple font-bold" : ""}`}
                onClick={() => setSelectedPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          {/* Line under buttons */}
          <div className="w-full border-t-2 border-black mt-2"></div>
        </div>

        {/* Image Grid */}
        <div className="maxwidth relative w-full px-6 md:px-32 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedPage === "KD Side 1" &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div
                  key={num}
                  className="w-full rounded-lg shadow-md flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={`/karrieredag_2024_photos/page1/karrieredag${num}.jpg`}
                    alt={`Karrieredag ${selectedPage} ${num}`}
                    width={500}
                    height={500}
                    objectFit="cover"
                    draggable="false"
                    className="max-w-full max-h-full"
                  />
                </div>
              ))}

            {selectedPage === "KD Side 2" &&
              [10, 11, 12, 13, 14, 15, 16, 17, 18].map((num) => (
                <div
                  key={num}
                  className="w-full rounded-lg shadow-md flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={`/karrieredag_2024_photos/page2/karrieredag${num}.jpg`}
                    alt={`Karrieredag ${selectedPage} ${num}`}
                    width={500}
                    height={500}
                    objectFit="cover"
                    draggable="false"
                    className="max-w-full max-h-full"
                  />
                </div>
              ))}

            {selectedPage === "Bankett" &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div
                  key={num}
                  className="w-full rounded-lg shadow-md flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={`/karrieredag_2024_photos/page3/bankett${num}.jpg`}
                    alt={`Karrieredag ${selectedPage} ${num}`}
                    width={500}
                    height={500}
                    objectFit="cover"
                    draggable="false"
                    className="max-w-full max-h-full"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Header 2 */}
        <h2 className="text-2xl font-bold text-left px-6 mt-12 md:px-32">
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
                  alt={`Company ${index + 1}`}
                  width={120}
                  height={80}
                  objectFit="contain"
                  draggable="false"
                  className="max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
