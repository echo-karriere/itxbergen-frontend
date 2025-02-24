import Logo from "./logo";
import LanguagePicker from "./language-picker";
import Link from "next/link";

export default function Navbar() {

  return (
    <>
      <div className="w-full h-20 bg-IXBbg top-0 flex items-center">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Container */}
            <div className="pl-6">
              <Logo />
            </div>

            {/* Centered Navigation */}
            <div className="flex-grow flex justify-center">
              <ul className="hidden md:flex gap-x-6 md:gap-x-20 text-white items-center text-sm">
                <Link href="/karrieredag">Karrieredag </Link>
                <Link href="/nettverking">Nettverking </Link>
                <li>Stillingsannonser </li>
                <li>Om ITxBergen </li>
                <li>Kontakt oss</li>
              </ul>
            </div>

            {/* Right Side Buttons */}
            <div className="pr-6">
              <LanguagePicker />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
