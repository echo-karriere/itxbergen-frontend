import { ChevronRight } from "lucide-react";
import React from "react";

const Otherthings = () => {
  return (
    <>
      {/* Section 3 */}
      <div className="maxwidth bg-white text-black flex items-center justify-center py-12 px-4">
        {/* Single Box */}
        <div className="w-[90%] bg-IXBbg1 rounded-3xl shadow-2xl p-6 flex flex-col space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-left">
            Se andre ting ITxBergen tilbyr!
          </h2>

          {/* Links */}
          <a href="/karrieredag" className="flex items-center hover:underline">
            Karrieredagen
            <ChevronRight className="w-5 h-5" />
          </a>
          <a href="/stillingsannonser" className="flex items-center hover:underline">
            Stillingsannonser
            <ChevronRight className="w-5 h-5" />
          </a>
          <a href="om-itx" className="flex items-center hover:underline">
            Om ITxBergen
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Otherthings;
