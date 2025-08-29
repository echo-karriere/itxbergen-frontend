import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  image?: string;
  date?: string;
  href?: string;
}

export default function NewsCard({ image, title, date, href }: NewsCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Europe/Oslo",
    })
    : null;

  const cardContent = (
    <article className="bg-white border border-gray-200 rounded-lg hover:shadow-md hover:bg-[#EEEFFF] cursor-pointer flex flex-col overflow-hidden w-80 h-80">
      {/* Purple bar */}
      <div className="h-1 w-full bg-[#9747FF]" />

      {/* Image */}
      <div className="flex-1 p-2">
        <Image
          src={image ?? "/Nettside_filler.png"}
          alt={title}
          className="w-full h-full object-cover rounded-sm"
          unoptimized
          width={800}
          height={1200}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-4">
        <h5 className="font-montSerrat font-bold text-black mb-2 leading-7">
          {title}
        </h5>
        {formattedDate && (
          <p className="text-gray-500 text-xs mt-auto">
            Publisert: {formattedDate}
          </p>
        )}
      </div>
    </article>
  );

  if (!href) return cardContent;

  const isExternalLink = href.startsWith("http");
  return isExternalLink ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </a>
  ) : (
    <Link href={href}>{cardContent}</Link>
  );
}
