import Image from "next/image";

export default function SectionSponsors() {
  return (
    <div className="bg-IXBbg1 maxwidth flex flex-col items-center justify-center">
      <p className="font-bold p-5 pt-8 text-lg">Takk til vår støttespiller</p>
      <Image
        className="w-64 p-5 pb-20"
        src="/SparebankenNorge.png"
        alt="Sparebanken Norge Logo"
        width={800}
        height={1200}
      />
    </div>
  );
}
