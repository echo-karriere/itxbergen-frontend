import OtherThings from "@/components/utils/otherthings";

export default function SectionExtraInformation() {
  const links = [
    { label: "Tilgjengelighet i lokalet", href: "#" },
    { label: "Kollektivtransport til lokalet?", href: "#" },
    { label: "Stillingsannonser", href: "/stillingsannonser" },
    { label: "Om ITxBergen", href: "/om-itx" },
  ];

  return (
    <div className="w-full bg-white py-12" id="extra">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold">Ekstra informasjon</h2>

        <p>
          Dersom det er noe du lurer på som ikke står skrevet her, send oss en
          mail til{" "}
          <a
            href="mailto:example@example.com"
            className="text-IXBPurple font-bold"
          >
            kontakt@itxbergen.no
          </a>
        </p>
      </div>
      <OtherThings links={links} />
    </div>
  );
}
