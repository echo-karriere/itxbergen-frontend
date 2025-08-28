import ITxButton from "@/components/utils/itx-button";
import Wave from "@/components/wave";

export default function SectionCTA() {
  return (
    <>
      <Wave position="top" theme="dark" bgColor="white" />

      <div className="bg-IXBbg text-white flex items-center justify-center relative">
        <div className="maxwidth flex flex-col items-center mx-6 md:text-center z-20 py-10">
          {/* Header */}
          <h2 className="text-3xl font-bold text-IXBfg px-6">
            Ønsker du mer informasjon om Karrieredagen?
          </h2>

          <div className="flex space-y-5 md:space-y-0 md:space-x-20 mt-12 flex-col md:flex-row">
            <ITxButton
              label="For Studenter"
              variant="ghost"
              href={"karrieredag/studenter"}
              className="w-80"
            />
            <ITxButton
              label="For Bedrifter"
              variant="ghost"
              href={"karrieredag/bedrifter"}
              className="w-80"
            />
          </div>
        </div>
      </div>

      <Wave position="bottom" theme="dark" bgColor="white" />
    </>
  );
}
