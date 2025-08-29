import Wave from "@/components/wave";
import { karrieredagTimeline } from "@/lib/timeline";

interface TimelineCardProps {
  title: string;
  time: string;
  description: string;
  isLeft: boolean;
}

function TimelineCard({ title, time, description, isLeft }: TimelineCardProps) {
  return (
    <div
      className={`mb-4 flex flex-col md:flex-row items-center ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } relative`}
    >
      <div className="absolute md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-IXBPurple rounded-full z-10"></div>

      <div
        className={`bg-white text-black rounded-xl p-4 max-w-sm md:max-w-xs w-full md:w-1/2 ${
          isLeft ? "md:mr-6 md:text-left" : "md:ml-6 md:text-right"
        }`}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="w-full h-1 bg-IXBPurple rounded-full my-2"></div>

        <p className="text-sm italic">{time}</p>
        <p className="text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function SectionTimeLine() {
  return (
    <>
      <Wave position="top" theme="light" bgColor="white" />

      <div
        className="bg-IXBbg2 text-black flex justify-center relative"
        id="timeplan"
      >
        <div className="maxwidth flex flex-col items-center mx-6 md:mx-0 z-20 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Timeplan for Karrieredagen 2025
          </h2>

          <div className="relative w-full md:w-3/4">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white h-full opacity-30 hidden md:block"></div>

            {karrieredagTimeline.map((item, index) => (
              <TimelineCard
                key={index}
                title={item.title}
                time={item.time}
                description={item.description}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
