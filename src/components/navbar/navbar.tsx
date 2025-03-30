"use client";

import Logo from "./logo";
import LanguagePicker from "./language-picker";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname().split("/");
  const [currentSelected, setCurrentSelected] = useState("");

  useEffect(() => {
    if (path.some((p) => p === "stillingsannonser")) {
      setCurrentSelected("stillingsannonser");
    } else if (path.some((p) => p === "karrieredag")) {
      setCurrentSelected("karrieredag");
    } else if (path.some((p) => p === "nettverking")) {
      setCurrentSelected("nettverking");
    } else if (path.some((p) => p === "om-itx")) {
      setCurrentSelected("om-itx");
    } else if (path.some((p) => p === "kontakt")) {
      setCurrentSelected("kontakt");
    } else {
      setCurrentSelected("");
    }
  }, [path]);

  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(false);
  };
  if (isOpen) {
  }
  return (
    <>
      <div
        className={`w-full${
          isOpen ? "h-72" : "h-20"
        } bg-IXBbg top-0 flex items-center transition-all duration-300`}
      >
        <div className="container mx-auto px-4 h-full">
          <div
            className={`flex ${
              isOpen ? "flex-col" : ""
            } items-center justify-between h-full`}
          >
            {/* Logo Container */}
            <div className="pl-6">
              <Logo />
            </div>

            {/* Centered Navigation */}
            <div className="flex-grow flex justify-center">
              <ul
                className={`${
                  isOpen ? "flex justify-between text-lg mt-2" : "hidden"
                } lg:flex-row flex-col lg:flex lg:gap-x-20 text-white items-center text-sm`}
              >
                <Link
                  onClick={handleClick}
                  href="/karrieredag"
                  className={`${currentSelected === "karrieredag" ? "text-energiskTurkis md:border-b-2 md:border-energiskTurkis md:pb-1 md:inline-block md:-mx-5 md:px-5" : "hover:text-energiskTurkis hover:md:border-b-2 hover:md:border-energiskTurkis hover:md:pb-1 hover:md:inline-block hover:md:-mx-5 hover:md:px-5"}`}
                >
                  Karrieredag{" "}
                </Link>
                <Link
                  onClick={handleClick}
                  href="/nettverking"
                  className={`${currentSelected === "nettverking" ? "text-energiskTurkis md:border-b-2 md:border-energiskTurkis md:pb-1 md:inline-block md:-mx-5 md:px-5" : "hover:text-energiskTurkis hover:md:border-b-2 hover:md:border-energiskTurkis hover:md:pb-1 hover:md:inline-block hover:md:-mx-5 hover:md:px-5"}`}
                >
                  Nettverking{" "}
                </Link>
                <Link
                  onClick={handleClick}
                  href="/stillingsannonser"
                  className={`${currentSelected === "stillingsannonser" ? "text-energiskTurkis md:border-b-2 md:border-energiskTurkis md:pb-1 md:inline-block md:-mx-5 md:px-5" : "hover:text-energiskTurkis hover:md:border-b-2 hover:md:border-energiskTurkis hover:md:pb-1 hover:md:inline-block hover:md:-mx-5 hover:md:px-5"}`}
                >
                  Stillingsannonser{" "}
                </Link>
                <Link
                  onClick={handleClick}
                  href="/om-itx"
                  className={`${currentSelected === "om-itx" ? "text-energiskTurkis md:border-b-2 md:border-energiskTurkis md:pb-1 md:inline-block md:-mx-5 md:px-5" : "hover:text-energiskTurkis hover:md:border-b-2 hover:md:border-energiskTurkis hover:md:pb-1 hover:md:inline-block hover:md:-mx-5 hover:md:px-5"}`}
                >
                  Om ITxBergen{" "}
                </Link>
                <Link
                  onClick={handleClick}
                  href="/kontakt"
                  className={`${currentSelected === "kontakt" ? "text-energiskTurkis md:border-b-2 md:border-energiskTurkis md:pb-1 md:inline-block md:-mx-5 md:px-5" : "hover:text-energiskTurkis hover:md:border-b-2 hover:md:border-energiskTurkis hover:md:pb-1 hover:md:inline-block hover:md:-mx-5 hover:md:px-5"}`}
                >
                  Kontakt oss
                </Link>
              </ul>
            </div>

            {/* Right Side Buttons */}
            <div className={`lg:hidden text-white ${isOpen ? "my-3" : ""}`}>
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
          </div>
        </div>
      </div>

      {/* {isOpen && ( */}
      {/*   <div className="absolute bg-IXBbg"> */}
      {/*     <ul className="flex flex-col text-white"> */}
      {/*       <Link href="/karrieredag">Karrieredag </Link> */}
      {/*       <Link href="/nettverking">Nettverking </Link> */}
      {/*       <Link href="/stillingsannonser">Stillingsannonser </Link> */}
      {/*       <Link href="/om-itx">Om ITxBergen </Link> */}
      {/*       <li>Kontakt oss</li> */}
      {/*     </ul> */}
      {/*   </div> */}
      {/* )} */}
    </>
  );
}
