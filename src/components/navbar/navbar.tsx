import Logo from "./logo";
import LanguagePicker from "./language-picker";
import ThemeToggle from "./themetoggle";

export default function Navbar() {
  return (
    <>
      <div className="w-full h-20 bg-IXBbg sticky top-0 flex items-center">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center h-full">
            {/* Logo Container */}
            <div className="absolute left-3 pl-6">
              <Logo />
            </div>
            {/* Spacer */}
            <div className="flex-grow flex justify-center">
              <ul className="hidden md:flex gap-x-20 text-white items-center text-sm">
                <li>Karrieredag </li>
                <li>Nettverking </li>
                <li>Stillingsannonser </li>
                <li>Om ITxBergen </li>
                <li>Kontakt oss</li>
              </ul>
            </div>
            {/* Right Side Buttons */}
            <div className="absolute right-10">
              <LanguagePicker />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
