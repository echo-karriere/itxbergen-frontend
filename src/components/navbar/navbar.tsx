import Logo from "./logo";
import Link from "next/link";
import LanguagePicker from "./language-picker";

export default function Navbar() {
  return (
    <>
      <div className="w-full h-20 bg-IXBbg top-0 flex items-center">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            {/* Logo Container */}
            <div className="absolute left-3 pl-6">
              <Logo />
            </div>
            {/* Spacer */}
            <div className="flex-grow flex justify-center">
              <ul className="hidden md:flex gap-x-20 text-white items-center text-sm">
                <Link href="/karrieredag">Karrieredag </Link>
                <Link href="/nettverking">Nettverking </Link>
                <Link href="/stillingsannonser">Stillingsannonser </Link>
                <li>Om ITxBergen </li>
                <li>Kontakt oss</li>
              </ul>
            </div>
            {/* Right Side Buttons */}
            <div className="absolute right-16">
              <LanguagePicker />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
