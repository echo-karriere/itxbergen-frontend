import ITxButton from "@/components/utils/itx-button";
import Wave from "@/components/wave";

export default function SectionAfterparty() {
  return (
    <>
      <Wave position="top" theme="dark" bgColor="bg-IXBbg1" />

      <div className="bg-IXBbg text-white py-12">
        <div className="maxwidth flex flex-col space-y-12 relative items-center justify-center text-center z-20">
          <h2 className="text-3xl font-bold text-IXBfg">
            Påmelding til ITxAfterParty 🎉
          </h2>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-20">
            <ITxButton
              label="Meld deg på nå!"
              variant="ghost"
              href={"https://pameldinger.no/e/cpygif"}
              className="w-80"
            />
          </div>
        </div>
      </div>

      <Wave position="bottom" theme="dark" bgColor="white" />
    </>
  );
}
