import Link from "next/link";
import Logo from "./logo";
import LanguagePicker from "./language-picker";
import ThemeToggle from "./themetoggle";
import {
  UserIcon,
  BriefcaseIcon,
  InfoIcon,
  ChevronDownIcon
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="w-full h-16 bg-IXBRed sticky top-0 flex items-center rounded-b-lg">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            {/* Logo Container */}
            <div className="absolute left-0 pl-6">
              <Logo />
            </div>
            {/* Spacer */}
            <div className="flex-grow flex justify-center">
              <ul className="hidden md:flex gap-x-12 text-white items-center">
                <li>
                  <Link href="/studenter">
                    <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      For studenter
                      <ChevronDownIcon className="w-4 h-4 ml-0" />
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/bedrift">
                    <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors flex items-center gap-2">
                      <BriefcaseIcon className="w-5 h-5" />
                      For bedrifter
                      <ChevronDownIcon className="w-4 h-4 ml-0" />
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors flex items-center gap-2">
                      <InfoIcon className="w-5 h-5" />
                      Om oss
                      <ChevronDownIcon className="w-4 h-4 ml-0" />
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Right Side Buttons */}
            <div className="absolute right-4 flex gap-4">
              <LanguagePicker />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
