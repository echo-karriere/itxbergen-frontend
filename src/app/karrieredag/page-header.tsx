import HeroImage from "@/components/hero-image";
import Breadcrumbs from "@/components/utils/breadcrumbs";

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <span className="mr-2">•</span> {children}
  </li>
);

export default function PageHeader() {
  const bulletPoints = [
    "Timeplan",
    "Standkart og bedrifter som deltar",
    "Workshops",
    "Ekstra informasjon",
  ];

  return (
    <div className="bg-IXBbg2 text-black flex items-center justify-center relative pt-12">
      <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
        {/* Text Content */}
        <div className="flex flex-col justify-center items-start mx-6 md:mx-0 md:w-3/5 text-left space-y-4 md:space-y-4">
          <Breadcrumbs current="Karrieredag" />

          <h1 className="text-3xl md:text-4xl font-bold mb-9">
            <span>Karrieredag</span>
          </h1>

          <p className="text-base">
            Karrieredagen i 2024 ble en suksess! Den ble avholdt den 19.
            september i Grieghallen. Vi har allerede startet planleggingen av
            karrieredagen 2025!
          </p>

          <strong className="text-base">
            Karrieredagen 2025 vil bli avholdt den 18. september i Grieghallen.
          </strong>

          <p className="text-base">
            På denne siden vil du finne ressurser til neste karrieredag, som:
          </p>

          <ul className="text-base space-y-2 md:pl-8">
            {bulletPoints.map((item, index) => (
              <BulletItem key={index}>{item}</BulletItem>
            ))}
          </ul>
        </div>

        <HeroImage
          src="/hero/public_speaker_amico.svg"
          alt="Illustration of a public speaker"
        />
      </div>
    </div>
  );
}
