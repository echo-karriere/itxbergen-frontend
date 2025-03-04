import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  address: string;
  width?: string;
  height?: string;
  redirectTo: string;
}

const EventCard = ({
  title,
  date,
  address,
  width = "300px",
  height = "100px",
  redirectTo,
}: EventCardProps) => {
  return (
    <Link href={redirectTo} passHref>
      <div
        style={{ width: width, height: height }}
        className="w-60 h-[100px] bg-white border border-gray-200 rounded-[5px] hover:shadow-md hover:bg-[#EEEFFF] cursor-pointer"
      >
        {/* Purple bar */}
        <div className="h-[3px] w-full bg-[#9747FF] rounded-t-lg"></div>

        <div className="p-4">
          <h5 className="text-md font-montSerrat font-bold text-black mb-2 leading-7">
            {title}
          </h5>

          <p className="font-sourceSans text-gray-500 text-[10px]">
            <i className="ri-calendar-line mr-1"></i>Dato: {date}
          </p>

          <p className="font-sourceSans text-gray-500 text-[10px]">
            <i className="ri-map-pin-line mr-1"></i>
            {address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
