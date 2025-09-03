import Image from "next/image";

interface StandMapProps {
  companies: string[];
  startups: string[];
  mapImage: string;
}

export default function StandMap({
  companies,
  startups,
  mapImage,
}: StandMapProps) {
  return (
    <div className="w-full flex justify-center">
      <Image
        src={mapImage}
        alt="Map of stands on karrieredag"
        width={700}
        height={600}
        className="rounded-lg"
        draggable={false}
      />
    </div>
  );
}
