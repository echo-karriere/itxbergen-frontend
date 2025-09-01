import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: LinkItem[];
}

export default function NavLinks({ items }: NavLinksProps) {
  return (
    <nav className="flex flex-col space-y-4">
      {items.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center font-semibold hover:underline"
        >
          {label}
          <ChevronRight />
        </Link>
      ))}
    </nav>
  );
}
