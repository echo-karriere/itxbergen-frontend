import Image from "next/image";

export default function SectionSponsors() {
  return (
    <div className="w-full bg-IXBbg1 pb-12">
      <div className="maxwidth flex flex-col items-center justify-center space-y-4">
        <p className="font-bold text-lg">Takk til vår støttespiller</p>
        <Image
          className="w-64 px-5"
          src="/SparebankenNorge.png"
          alt="Sparebanken Norge Logo"
          width={800}
          height={1200}
        />
      </div>
    </div>
  );
}
