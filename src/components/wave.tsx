import clsx from "clsx";
import Image from "next/image";

interface WaveProps {
  position: "top" | "bottom";
  theme: "light" | "dark";
  bgColor: string;
  className?: string;
}

export default function Wave({
  position,
  theme,
  bgColor,
  className,
}: WaveProps) {
  const src = `/wave_${position}_${theme}.svg`;

  return (
    <Image
      src={src}
      alt={`Wave ${position} ${theme}`}
      width={1920}
      height={1080}
      draggable={false}
      className={clsx("w-full hidden md:flex", bgColor, className)}
    />
  );
}
