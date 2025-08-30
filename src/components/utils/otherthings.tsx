import React from "react";
import NavLinks from "../nav-links";

export default function OtherThings() {
  const links = [
    { label: "Karrieredagen", href: "/karrieredag" },
    { label: "Stillingsannonser", href: "/stillingsannonser" },
    { label: "Karakterkalkulator", href: "/karakterkalkulator" },
    { label: "Om ITxBergen", href: "/om-itx" },
  ];

  return (
    <div className="w-full bg-white py-12 px-6">
      <div className="maxwidth w-[90%] bg-IXBbg1 flex flex-col rounded-3xl shadow-2xl p-6 space-y-8">
        <h2 className="text-2xl font-bold">Se andre ting ITxBergen tilbyr!</h2>

        <NavLinks items={links} />
      </div>
    </div>
  );
}
