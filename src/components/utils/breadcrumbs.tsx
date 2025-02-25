import Link from "next/link";
import React from "react";

const Breadcrumbs = ({ current }: { current: String }) => {
  return (
    <>
      <nav aria-label="breadcrumbs">
        <ol className="inline-flex items-center space-x-1 font-inter text-xs text-[#121212] mb-2 font-normal">
          <li>
            <Link href="/">Hjem</Link>
          </li>
          <li>-</li>
          <li>
            <span className="font-bold">{current}</span>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
