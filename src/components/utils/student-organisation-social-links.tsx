import Link from "next/link";
import Image from "next/image";
import { StudentOrganisation } from "@/types/student-organisation";

const SOCIAL_LINKS: {
  name: string;
  key: keyof StudentOrganisation;
  icon: string;
}[] = [
  { name: "Website", key: "website", icon: "/icons/website.png" },
  { name: "Facebook", key: "facebook", icon: "/icons/facebook.svg" },
  { name: "Instagram", key: "instagram", icon: "/icons/instagram.svg" },
  { name: "LinkedIn", key: "linkedin", icon: "/icons/linkedin.svg" },
  { name: "GitHub", key: "github", icon: "/icons/github.svg" },
];

export default function StudentOrganisationSocialLinks({
  organisation,
}: {
  organisation: StudentOrganisation | null;
}) {
  if (!organisation) return null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      {SOCIAL_LINKS.map(({ name, key, icon }) => {
        const url = organisation[key];
        if (!url) return null;

        return (
          <Link
            key={key}
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={icon}
              alt={name}
              width={32}
              height={32}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        );
      })}
    </div>
  );
}
