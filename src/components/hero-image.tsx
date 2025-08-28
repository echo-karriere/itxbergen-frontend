import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({ src, alt, className }: HeroImageProps) {
  return (
    <div
      className={`flex justify-center items-center w-full md:w-2/5 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        height={500}
        width={500}
        className="object-contain md:transform md:scale-110"
        draggable="false"
      />
    </div>
  );
}
