import Image from "next/image";

export default function Nettverking() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black md:h-[70vh] flex items-center justify-center relative">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full space-y-12 md:space-y-0 md:space-x-20">

        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-IXBbg2 text-black h-auto flex items-center justify-center relative">
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

      <div className="bg-white text-black md:h-[70vh] flex items-center justify-center relative">

      </div>
    </div>
  );
}
