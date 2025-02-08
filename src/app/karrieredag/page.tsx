import Image from "next/image"
import Otherthings from "@/components/utils/otherthings"
import Breadcrumbs from "@/components/utils/breadcrumbs"

export default function Karrieredag() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-IXBbg2 text-black md:h-[70vh] h-auto flex items-center justify-center relative pt-12 md:pt-0">
        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center w-full px-6 md:px-40 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center items-center md:items-start w-full md:w-3/5 text-center md:text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs
              current="Karrieredag"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              <span>Karrieredag</span>
            </h1>
            <p className="text-base">
              Karrieredagen i 2024 ble en suksess! Den ble avholdt den 19. september i Grieghallen.
              Vi har allerede startet planleggingen av karrieredagen 2025!
            </p>
            <p className="text-base">På denne siden vil du finne ressurser til neste karrieredag, som:</p>
            <ul className="text-base space-y-2 md:pl-8">
              {[
                "Timeplan",
                "Standkart og bedrifter som deltar",
                "Workshops",
                "Konseptpresentasjoner",
                "Ekstra informasjon"
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
      {/* Section 2 */}


      {/* Section 3 */}
      <Otherthings />
    </div>
  )
}
