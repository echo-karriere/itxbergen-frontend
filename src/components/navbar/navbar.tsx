"use client";

import Logo from "./logo";
import LanguagePicker from "./language-picker";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { useState } from "react";

export default function Navbar() {
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
                <Link onClick={handleClick} href="/karrieredag">
                  Karrieredag{" "}
                </Link>
                <Link onClick={handleClick} href="/nettverking">
                  Nettverking{" "}
                </Link>
                <Link onClick={handleClick} href="/stillingsannonser">
                  Stillingsannonser{" "}
                </Link>
                <Link onClick={handleClick} href="/om-itx">
                  Om ITxBergen{" "}
                </Link>
                <Link onClick={handleClick} href="/kontakt">
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
