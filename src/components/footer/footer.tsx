import Logo from "./logo";
import Partners from "./partners";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-IXBbg text-white">
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
                  <li className="mb-4">Karrieredag</li>
                  <li className="mb-4">Arrangementer</li>
                  <li className="mb-4">Stillingsannonser</li>
                  <li className="mb-4">Om ItxBergen</li>
                </ul>
              </div>

              {/* Kontakt oss */}
              <div>
                <h3 className="font-bold mb-4">Kontakt oss</h3>
                <ul>
                  <li className="mb-4">Kontakt oss</li>
                  <li className="mb-4">Presse</li>
                  <li className="mb-4">Opplevd noe ugreit?</li>
                </ul>
              </div>

              {/* Om nettstedet */}
              <div>
                <h3 className="font-bold mb-4">Om nettstedet</h3>
                <ul>
                  <li className="mb-4">Personvernserklæring</li>
                  <li className="mb-4">Salgs- og påmeldingsvilkår</li>
                  <li className="mb-4">Tilgjengelighet</li>
                  <li className="mb-4">Informasjonskapsler</li>
                </ul>
              </div>

              {/* Sosiale medier */}
              <div>
                <h3 className="font-bold mb-4">Sosiale medier</h3>
                <ul>
                  <li className="mb-4">LinkedIn</li>
                  <li className="mb-4">Instagram</li>
                  <li className="mb-4">Facebook</li>
                  <li className="mb-4">GitHub</li>
                </ul>
              </div>
            </div>
          </div>

          {/* text */}
          <div className="flex justify-center text-sm font-bold mb-2 mt-4">
            <p>ITxBergen © 2019 - 2024</p>
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
