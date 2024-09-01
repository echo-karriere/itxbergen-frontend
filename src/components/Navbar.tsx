import Link from "next/link";
import Logo from "./logo";
import LanguagePicker from "./language-picker";

export default function Navbar() {
    return (
        <>
            <div className="w-full h-16 bg-IXBRed sticky top-0 flex items-center rounded-b-lg">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex items-center h-full">
                        {/* Logo Container */}
                        <div className="absolute left-0 pl-4">
                            <Logo />
                        </div>
                        {/* Spacer */}
                        <div className="flex-grow flex justify-center">
                            <ul className="hidden md:flex gap-x-12 text-white items-center">
                                <li>
                                    <Link href="/studenter">
                                        <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors">For Studenter</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bedrift">
                                        <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors">For Bedrifter</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        <p className="px-4 py-2 rounded-lg hover:bg-IXBRed-dark transition-colors">Om Oss</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Language Button Container */}
                        <div className="absolute right-4">
                            <LanguagePicker />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}