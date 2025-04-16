import Logo from "./logo";
import Partners from "./partners";

export default function Footer() {
  return (
    <>
      <footer id="bottom" className="relative bg-IXBbg text-white">
        {/* Footer Content Container */}
        <div className="relative container mx-auto py-4">
          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-4">
            <Logo />
          </div>

          {/* Top Section: Links */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 text-sm max-w-screen-lg w-full mb-2">
              {/* Informasjon */}
              <div>
                <h3 className="font-bold mb-4">Informasjon</h3>
                <ul>
                  <li className="mb-4">
                    <a href="/karrieredag" className="hover:underline">
                      Karrieredag
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/#bottom" className="hover:underline">
                      Arrangementer
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/stillingsannonser" className="hover:underline">
                      Stillingsannonser
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/karakterkalkulator" className="hover:underline">
                      Karakterkalkulator
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="/om-itx" className="hover:underline">
                      Om ITxBergen
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kontakt oss */}
              <div>
                <h3 className="font-bold mb-4">Kontakt oss</h3>
                <ul>
                  <li className="mb-4">
                    <a href="/kontakt" className="hover:underline">
                      Kontakt Oss
                    </a>
                  </li>
                  <li className="mb-4">Presse</li>
                  <li className="mb-4">Opplevd noe ugreit?</li>
                </ul>
              </div>

              {/* Om nettstedet */}
              <div>
                <h3 className="font-bold mb-4">Om nettstedet</h3>
                <ul>
                  <li className="mb-4">
                    <a href="/personvern" className="hover:underline">
                      Personvernserklæring
                    </a>
                  </li>
                  <li className="mb-4">Salgs- og påmeldingsvilkår</li>
                  <li className="mb-4">Tilgjengelighet</li>
                  <li className="mb-4">Informasjonskapsler</li>
                </ul>
              </div>

              {/* Sosiale medier */}
              <div>
                <h3 className="font-bold mb-4">Sosiale medier</h3>
                <ul>
                  <li className="mb-4">
                    <a
                      href="https://no.linkedin.com/company/itxbergen?trk=public_post_follow-view-profile"
                      className="hover:underline"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://www.instagram.com/itxbergen/"
                      className="hover:underline"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://www.facebook.com/itxbergen"
                      className="hover:underline"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/echo-karriere"
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* text */}
          <div className="flex justify-center text-sm font-bold mb-2 mt-4">
            <p>ITxBergen © 2019 - 2025</p>
          </div>

          {/* Horizontal Line */}
          <div className="w-full border-t border-white mb-2"></div>

          {/* "Powered by" Text */}
          <div className="flex justify-center text-sm mb-2 mt-4">
            <p>Powered by:</p>
          </div>

          {/* Bottom Section: Partners */}
          <div className="flex justify-center mb-2">
            <Partners />
          </div>
        </div>
      </footer>
    </>
  );
}
