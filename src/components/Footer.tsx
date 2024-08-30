
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/" className="hover:text-gray-400">Home</a>
                    <a href="/about" className="hover:text-gray-400">About</a>
                    <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                    <a href="/contact" className="hover:text-gray-400">Contact</a>
                </div>
            </div>
        </footer>
    );
}