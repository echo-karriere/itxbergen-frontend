import ITxButton from "@/components/utils/itx-button";

export default function SectionPaneldebatt() {
  return (
    <div className="w-full bg-IXBbg1 py-12" id="workshops">
      <div className="maxwidth text-black flex flex-col relative px-6 md:px-32 space-y-8">
        <h2 className="text-2xl font-bold text-start">Paneldebatt</h2>

        <p className="md:w-4/5">
          Er du klar for å høre om mulighetene innenfor IT-verdenen? På karrieredagen 2025 inviterer vi til årets paneldebatt. Et høydepunkt du ikke bør gå glipp av!
          <br />
          <br />
          Debatten ledes av ingen ringere enn Thomas Teige! På scenen møter du profiler som representerer ulike retninger innenfor IT. De vil både presentere sine erfaringer og arbeidsoppgaver, samt forsøke å overbevise DEG om hvorfor deres fagfelt er den mest spennende veien videre:
          <br />
          <br />

          - Kristi Loe fra Sparebanken Norge <br />
          - Christoffer Pettersen fra Avo Consulting <br />
          - Alf Gunnar Andersen fra Horde <br />
          - Eyvind Knudsen Veggeland fra Norges bank <br /><br />
          Her får du verdifull innsikt i både hverdagen, bransjen og de mange mulighetene som venter etter studiene. <br /><br />
          Kickstart dagen med en energisk debatt - og kanskje finner du din fremtidige retning allerede her! <span className="font-bold">Oppstart klokken 11.30 i Klokkeklang, Grieghallen</span>. Så meld deg på!
        </p>

        <ITxButton variant={"primary"} label={"Meld deg på paneldebatt!"} className="w-80" href="https://pameldinger.no/e/ldqlsx" />
      </div>
    </div>
  )
}

