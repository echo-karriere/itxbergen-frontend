import Breadcrumbs from "@/components/utils/breadcrumbs";
import Image from "next/image";

export default function PageHeader() {
  const eventInfo = [
    { label: "Hvor", value: "Grieghallen, Bergen" },
    { label: "Dato", value: "17. september 2026" },
    { label: "Klokkeslett", value: "10:00 - 16:00" },
  ];

  return (
    <div className="w-full bg-IXBbg2 py-12 shadow">
      <div className="maxwidth text-black flex flex-col md:flex-row space-y-12 md:space-x-20 px-6 md:px-32 justify-center items-center">
        <div className="flex flex-col md:w-3/5 space-y-4">
          <Breadcrumbs current="Karrieredag" />

          <h1 className="text-3xl md:text-4xl font-bold">
            <span>Karrieredag</span>
          </h1>

          <p className="text-xl">
            Neste karrieredag er satt <br></br>{" "}
            <span className="text-IXBPurple font-bold">
              17.september 2026 i Grieghallen!
            </span>
          </p>

          <p className="text-base">
            Karrieredagen i 2025 ble en suksess! Den ble avholdt den 18.
            september i Grieghallen. Vi har allerede startet planleggingen av
            karrieredagen 2026!
          </p>

          <ul className="list-disc">
            På denne siden vil du finne ressurser til neste karrieredag, som:
            <div className="pl-5 space-y-2 pt-3">
              <li>Timeplan</li>
              <li>Standkart og bedrifter som deltar</li>
              <li>Workshops</li>
              <li>Konseptpresentasjoner</li>
              <li>Ekstra informasjon</li>
            </div>
          </ul>
        </div>

        <Image
          className="w-full md:w-[60%] h-auto rounded-tl-2xl rounded-br-2xl shadow-2xl space-y-8"
          src="/kdimg.jpg"
          alt="Karrieredag bilde"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
