import { Link } from "lucide-react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Nettverking() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black md:h-[70vh] h-[120vh] flex items-center justify-center relative pt-0 md:pt-0">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Nettverking</span>
            </h1>
            <p className="text-base">
              ITxBergen er opptatt av at studentene skal finne rikelig med informasjon som kan fremme deres karriere innen IT.
            </p>
            <p className="text-base">
              På denne siden vil du finne ressurser for IT-studenter, som:
            </p>

            {/* Links */}
            <a href="#" className="flex items-center font-bold hover:underline">
              Studentorganisasjoner og linjeforeninger
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#" className="flex items-center font-bold hover:underline">
              Arrangementer
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#" className="flex items-center font-bold hover:underline">
              Nyheter
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center w-full md:w-2/5">
            <Image
              src="/pair_programming_amico.png"
              alt="ItxBergen"
              height={500}
              width={500}
              className="object-contain md:transform md:scale-110"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg2 text-black h-screen flex items-center justify-center relative">
        {/* Wave separator at the top */}
        <div className="absolute top-0 w-full" style={{ marginTop: '-12vh' }}>
          <Image
            src="/wave_top_light.svg"
            alt="Wave Top"
            layout="intrinsic"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </div>

      </div>

      <div className="bg-white text-black flex items-center justify-center py-12 px-4">
        {/* Single Box */}
        <div className="w-[90%] bg-IXBbg1 rounded-3xl shadow-2xl p-6 flex flex-col space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-left">
            Se andre ting ITxBergen tilbyr!
          </h2>

          {/* Links */}
          <a href="#" className="flex items-center hover:underline">
            Studentorganisasjoner og linjeforeninger
            <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#" className="flex items-center hover:underline">
            Arrangementer
            <ChevronRight className="w-5 h-5" />
          </a>
          <a href="#" className="flex items-center hover:underline">
            Nyheter
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
