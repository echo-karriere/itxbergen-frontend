import { TimelineItem } from "@/lib/timeline";

interface TimelineCardProps extends TimelineItem {
  isLeft: boolean;
}

const TimelineCard = ({
  title,
  time,
  description,
  address,
  isLeft,
}: TimelineCardProps) => {
  return (
    <div
      className={`mb-4 md:mb-0 flex flex-col md:flex-row items-center relative ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Purple dot for each event */}
      <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-IXBPurple rounded-full z-10"></div>

      <div
        className={`bg-white text-black rounded-xl p-4 max-w-sm md:max-w-xs w-full md:w-1/2 ${
          isLeft ? "md:mr-6" : "md:ml-6"
        }`}
      >
        <div className="text-left">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="w-full h-1 bg-IXBPurple rounded-full my-2"></div>

          <p className="text-sm font-bold italic">{time}</p>
          <p className="text-sm mt-1">{description}</p>
          <p className="text-sm font-bold mt-1">{address}</p>
        </div>
      </div>
    </div>
  );
};

interface TimeLineProps {
  timelineEvents: TimelineItem[];
}

export default function TimeLine({ timelineEvents }: TimeLineProps) {
  return (
    <div className="relative w-full md:w-3/4">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white h-full opacity-30 hidden md:block"></div>

      {timelineEvents.map((item, index) => (
        <TimelineCard
          key={index}
          title={item.title}
          time={item.time}
          description={item.description}
          address={item.address}
          isLeft={index % 2 === 0}
        />
      ))}
    </div>
  );
}
