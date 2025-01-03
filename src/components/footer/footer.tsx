import Logo from "./logo";
import Partners from "./partners";

export default function Footer() {
  return (
    <>
      <footer className="relative w-full h-96 bg-IXBbg flex items-center justify-center">
        <div className="absolute inset-0">
          {/* SVG pattern will go here */}
        </div>

        {/* Logo */}
        <div className="absolute top-6 left-6">
          <Logo />
        </div>

        <div className="w-[75%] grid grid-cols-4 gap-8 text-white text-sm text-left mb-16">
          <div>
            <h3 className="font-semibold mb-4">Informasjon</h3>
            <p className="mb-4">Karrieredag</p>
            <p className="mb-4">Arrangementer</p>
            <p className="mb-4">Stillingsannonser</p>
            <p className="mb-4">Om ItxBergen</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontakt oss</h3>
            <p className="mb-4">Kontakt oss</p>
            <p className="mb-4">Presse</p>
            <p className="mb-4">Opplevd noe ugreit?</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Om nettstedet</h3>
            <p className="mb-4">Personvernserklæring</p>
            <p className="mb-4">Salgs- og påmeldingsvilkår</p>
            <p className="mb-4">Tilgjengilighet</p>
            <p className="mb-4">Informasjonskapsler</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Sosiale medier</h3>
            <p className="mb-4">Linkedin</p>
            <p className="mb-4">Instagram</p>
            <p className="mb-4">Facebook</p>
            <p className="mb-4">Github</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[75%] border-t border-white" />

        {/* Parters */}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Partners />
        </div>

      </footer>
    </>
  );
}
