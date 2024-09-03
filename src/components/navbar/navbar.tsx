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
import StudentDropdown from "./dropdowns/student-dropdown";
import CompanyDropdown from "./dropdowns/company-dropdown";
import AboutDropdown from "./dropdowns/about-dropdown";

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
                  <StudentDropdown />
                </li>
                <li>
                  <CompanyDropdown />
                </li>
                <li>
                  <AboutDropdown />
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
