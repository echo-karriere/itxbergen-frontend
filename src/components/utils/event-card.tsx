import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  company: string;
  width?: string;
  redirectTo: string;
}

const EventCard = ({
  title,
  date,
  company,
  width = "300px",
  redirectTo,
}: EventCardProps) => {
  return (
    <Link
      href={redirectTo}
      target="_blank"
      rel="noopener noreferrer"
      style={{ width }}
      className="flex flex-col bg-white border border-gray-200 rounded-[5px] hover:shadow-md hover:bg-[#EEEFFF] cursor-pointer"
    >
      {/* Purple bar */}
      <div className="h-[3px] w-full bg-IXBPurple rounded-t-lg"></div>

      <div className="flex flex-col flex-1 p-4">
        <h5 className="text-md font-montSerrat font-bold text-black mb-2 leading-7 break-words">
          {title}
        </h5>

        <p className="font-sourceSans text-gray-500 text-[10px] font-bold mt-auto">
          <i className="ri-calendar-line mr-1"></i>
          {date}
        </p>

        <p className="font-sourceSans text-gray-500 text-[10px] font-bold">
          <i className="mr-1"></i>
          {company}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
