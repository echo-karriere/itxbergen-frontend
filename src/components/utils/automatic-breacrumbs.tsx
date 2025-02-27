"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs({ customLast }: { customLast?: string }) {
  const pathname = usePathname(); // Get current path
  const pathSegments = pathname.split("/").filter(Boolean); // Split and remove empty segments

  return (
    <nav aria-label="breadcrumbs">
      <ol className="inline-flex items-center space-x-1 font-inter text-xs text-[#121212] mb-2 font-normal">
        {/* Home Link */}
        <li>
          <Link href="/">Hjem</Link>
        </li>

        {/* Dynamic Breadcrumb Links */}
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/"); // Build path up to this segment
          const formattedName = decodeURIComponent(segment).replace(/-/g, " "); // Format text
          const isLast = index === pathSegments.length - 1; // Check if last segment

          return isLast ? (
            customLast ? (
              <li key={href} className="flex items-center">
                <span className="mr-1">-</span>
                <span className="font-bold">{customLast}</span>
              </li>
            ) : (
              <li key={href} className="flex items-center">
                <span className="mr-1">-</span>

                <span className="font-bold">
                  {formattedName.charAt(0).toUpperCase() +
                    formattedName.slice(1)}
                </span>
              </li>
            )
          ) : (
            <li key={href} className="flex items-center">
              <span className="mr-1">-</span>

              <Link href={href}>
                {formattedName.charAt(0).toUpperCase() + formattedName.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
