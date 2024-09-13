import Link from "next/link";
import Vercel from "./vercel";
import Sanity from "./sanity";

export default function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <main className="flex-grow">{/* Content goes here*/}</main>
      <footer className="bg-IXBRed text-white py-10 rounded-t-lg">
        <div className="flex justify-center">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl">
            {/* Informasjon */}
            <div>
              <h2 className="font-bold text-lg mb-4">Informasjon</h2>
              <ul>
                <li className="mb-2">
                  <Link href="/">
                    <p className="text-GrayText hover:text-white">
                      For studenter
                    </p>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/">
                    <p className="text-GrayText hover:text-white">
                      For bedrifter
                    </p>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/">
                    <p className="text-GrayText hover:text-white">Om oss</p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kontakt oss */}
            <div>
              <h2 className="font-bold text-lg mb-4">Kontakt oss</h2>
              <ul>
                <li className="mb-2">
                  <Link href="/privacy-policy">
                    <p className="text-GrayText hover:text-white">
                      Styremedlemmer
                    </p>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms-of-service">
                    <p className="text-GrayText hover:text-white">
                      Kontakt oss
                    </p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Om nettstedet */}
            <div>
              <h2 className="font-bold text-lg mb-4">Om nettstedet</h2>
              <ul>
                <li className="mb-2">
                  <Link href="/personvern">
                    <p className="text-GrayText hover:text-white">
                      Personvernserklæring
                    </p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sosiale medier */}
            <div>
              <h2 className="font-bold text-lg mb-4">Sosiale medier</h2>
              <ul>
                <li className="mb-2">
                  <a
                    href="https://www.instagram.com/itxbergen?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    className="flex items-center space-x-2 text-GrayText hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.16c3.19 0 3.58 0 4.85.07 1.27.07 2.13.28 2.61.46.67.26 1.15.57 1.65 1.07.5.5.81.98 1.07 1.65.18.48.39 1.34.46 2.61.07 1.27.07 1.66.07 4.85s0 3.58-.07 4.85c-.07 1.27-.28 2.13-.46 2.61-.26.67-.57 1.15-1.07 1.65-.5.5-.98.81-1.65 1.07-.48.18-1.34.39-2.61.46-1.27.07-1.66.07-4.85.07s-3.58 0-4.85-.07c-1.27-.07-2.13-.28-2.61-.46-.67-.26-1.15-.57-1.65-1.07-.5-.5-.98-.98-1.07-1.65-.18-.48-.39-1.34-.46-2.61-.07-1.27-.07-1.66-.07-4.85s0-3.58.07-4.85c.07-1.27.28-2.13.46-2.61.26-.67.57-1.15 1.07-1.65.5-.5.98-.81 1.65-1.07.48-.18 1.34-.39 2.61-.46 1.27-.07 1.66-.07 4.85-.07m0-2.16c-3.25 0-3.67 0-4.95.07-1.32.07-2.22.3-3.02.63-.83.34-1.54.8-2.24 1.5-.7.7-1.16 1.41-1.5 2.24-.33.8-.56 1.7-.63 3.02-.07 1.28-.07 1.7-.07 4.95s0 3.67.07 4.95c.07 1.32.3 2.22.63 3.02.34.83.8 1.54 1.5 2.24.7.7 1.41 1.16 2.24 1.5.8.33 1.7.56 3.02.63 1.28.07 1.7.07 4.95.07s3.67 0 4.95-.07c1.32-.07 2.22-.3 3.02-.63.83-.34 1.54-.8 2.24-1.5.7-.7 1.16-1.41 1.5-2.24.33-.8.56-1.7.63-3.02.07-1.28.07-1.7.07-4.95s0-3.67-.07-4.95c-.07-1.32-.3-2.22-.63-3.02-.34-.83-.8-1.54-1.5-2.24-.7-.7-1.41-1.16-2.24-1.5-.8-.33-1.7-.56-3.02-.63-1.28-.07-1.7-.07-4.95-.07zM12 5.83c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.43-10.87c-.79 0-1.43.64-1.43 1.43s.64 1.43 1.43 1.43 1.43-.64 1.43-1.43-.64-1.43-1.43-1.43z" />
                    </svg>
                    <p>Instagram</p>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"
                      />
                      <path
                        fill="currentColor"
                        d="M5 5v14h14v-5h2v7H3V3h7v2H5z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.facebook.com/itxbergen"
                    className="flex items-center space-x-2 text-GrayText hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.1 8.44 9.87v-6.98h-2.54v-2.89h2.54v-2.2c0-2.51 1.48-3.89 3.75-3.89 1.09 0 2.24.19 2.24.19v2.48h-1.26c-1.24 0-1.63.76-1.63 1.54v1.88h2.77l-.44 2.89h-2.33v6.98A10.004 10.004 0 0022 12z"></path>
                    </svg>
                    <p>Facebook</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"
                      />
                      <path
                        fill="currentColor"
                        d="M5 5v14h14v-5h2v7H3V3h7v2H5z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.linkedin.com/company/itxbergen/"
                    className="flex items-center space-x-2 text-GrayText hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-11.44 14.93h-2.74v-8.54h2.74v8.54zM6.4 8.5a1.57 1.57 0 11.01-3.13 1.57 1.57 0 01-.01 3.13zm13.6 9.43h-2.74v-4.17c0-.99-.35-1.67-1.22-1.67-.67 0-1.07.45-1.25.88-.06.16-.07.39-.07.62v4.34h-2.74s.04-7.03 0-7.77h2.74v1.1c.36-.55 1.01-1.34 2.46-1.34 1.8 0 3.15 1.18 3.15 3.72v4.29z"></path>
                    </svg>
                    <p>Linkedin</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"
                      />
                      <path
                        fill="currentColor"
                        d="M5 5v14h14v-5h2v7H3V3h7v2H5z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://github.com/echo-karriere/"
                    className="flex items-center space-x-2 text-GrayText hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.205 11.387.6.111.82-.261.82-.578 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.082-.729.082-.729 1.204.084 1.837 1.236 1.837 1.236 1.07 1.834 2.809 1.304 3.494.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.222-.124-.305-.536-1.533.117-3.194 0 0 1.009-.322 3.3 1.231.96-.267 1.986-.4 3.006-.405 1.02.005 2.046.138 3.006.405 2.29-1.553 3.297-1.231 3.297-1.231.653 1.661.241 2.889.118 3.194.77.841 1.235 1.912 1.235 3.222 0 4.609-2.807 5.622-5.479 5.921.43.372.824 1.105.824 2.228 0 1.609-.015 2.904-.015 3.297 0 .32.219.694.825.576C20.565 21.797 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                    </svg>
                    <p>GitHub</p>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"
                      />
                      <path
                        fill="currentColor"
                        d="M5 5v14h14v-5h2v7H3V3h7v2H5z"
                      />
                    </svg>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://slack.com/your-workspace"
                    className="flex items-center space-x-2 text-GrayText hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.8 122.8"
                    >
                      <path d="M30.3 77.5c0 7.1-5.8 12.9-12.9 12.9S4.5 84.6 4.5 77.5s5.8-12.9 12.9-12.9h12.9v12.9zm6.4 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.1c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.5zM45.6 30.3c-7.1 0-12.9-5.8-12.9-12.9S38.5 4.5 45.6 4.5s12.9 5.8 12.9 12.9v12.9H45.6zm0 6.4c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H13.5C6.4 62.5.6 56.7.6 49.6s5.8-12.9 12.9-12.9h32.1zM92.5 45.6c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9h-12.9V45.6zm-6.4 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V13.5C60.3 6.4 66.1.6 73.2.6s12.9 5.8 12.9 12.9v32.1zM77.2 92.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9v-12.9h12.9zm0-6.4c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.1c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.2z" />
                    </svg>
                    <p>Slack</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-8.29 8.3-1.42-1.42 8.3-8.29H14V3z"
                      />
                      <path
                        fill="currentColor"
                        d="M5 5v14h14v-5h2v7H3V3h7v2H5z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center text-GrayText text-sm">
          ITxBergen &copy; 2019-{new Date().getFullYear()}
        </p>
        <div className="border-t border-gray-700 mt-10 pt-6">
          <p className="text-center text-GrayText">Powered by:</p>
          <div className="flex items-center justify-center gap-4">
            <Vercel />
            <Sanity />
          </div>
        </div>
      </footer>
    </div>
  );
}
