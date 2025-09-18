import ITxButton from "@/components/utils/itx-button";
import Wave from "@/components/wave";

export default function SectionAfterparty() {
  return (
    <>
      <Wave position="top" theme="dark" bgColor="bg-IXBbg1" />

      <div className="bg-IXBbg text-white py-12" id="afterparty">
        <div className="maxwidth flex flex-col space-y-12 relative items-center justify-center text-center z-20">
          <h2 className="text-3xl font-bold text-IXBfg">
            Påmelding til ITxAfterParty 🎉
          </h2>

          <div className="flex flex-col items-center space-y-12 md:space-x-20">
            <ITxButton
              label="Meld deg på nå!"
              variant="ghost"
              href={"https://pameldinger.no/e/cpygif"}
              className="w-80"
            />
            <p>
              Karrieredagen 2025 nærmer seg med storm, og med dette åpner vi nå
              opp for påmelding til ITxAfterParty! 🎉 Etter en dag med mange,
              givende samtaler med spennende bedrifter, trenger ikke minglingen
              ta slutt der! Meld deg på kveldens event og skap relasjoner i en
              litt mer avslappet setting. Dette er et helt nytt konsept som
              åpner dørene for alle studenter, også for dere som ikke har
              gullbillett til den tradisjonelle gallaen. Sikre deg en plass
              allerede i dag! Link til påmelding finner du i caption!
            </p>

            <p className="font-bold">
              Galla og ITxAfterParty vil bli avholdt på Galleri Nygaten. <br />
              Addresse: Nygaten 7, 5017 Bergen
            </p>
          </div>
        </div>
      </div>

      <Wave position="bottom" theme="dark" bgColor="white" />
    </>
  );
}
