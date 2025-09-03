import TimeLine from "@/components/utils/timeline";
import Wave from "@/components/wave";
import { karrieredagTimeline, gallaAfterPartyTimeline } from "@/lib/timeline";

export default function SectionTimeline() {
  return (
    <>
      <Wave position="top" theme="light" bgColor="white" />

      <div
        className="bg-IXBbg2 text-black flex justify-center relative py-12"
        id="timeplan"
      >
        <div className="maxwidth flex flex-col items-center space-y-12 px-6 md:mx-0 z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Timeplan for Karrieredagen 2025
          </h2>

          <TimeLine timelineEvents={karrieredagTimeline} />

          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Timeplanen for Galla 2025 🎉
          </h2>

          <TimeLine timelineEvents={gallaAfterPartyTimeline} />
        </div>
      </div>
    </>
  );
}
