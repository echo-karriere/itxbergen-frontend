import Image from "next/image";

interface Image {
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: Image[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="w-full rounded-lg shadow-md flex items-center justify-center overflow-hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={500}
            height={500}
            className="max-w-full max-h-full object-cover"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
