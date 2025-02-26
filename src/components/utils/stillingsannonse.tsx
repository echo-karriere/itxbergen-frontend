import Image from "next/image";

interface StillingsannonseProps {
  image: string;
  title: string;
  company: string;
  location: string;
  description: string;
  date?: string;
}

export default function Stillingsannonse({
  image,
  title,
  company,
  location,
  description,
  date,
}: StillingsannonseProps) {
  return (
    <div className="md:h-[165px] md:w-[685px] border border-[#E5E7EB] m-5 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm p-3 shadow-md shadow-gray hover:bg-IXBbg1">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Image container */}
        <div className="h-28 w-28 flex justify-center items-center align-middle mt-4 mx-5 md:mr-4 flex-shrink-0">
          <Image
            src={image}
            alt={company}
            height={400}
            width={400}
            className="h-20 w-20 md:h-28 md:w-28 rounded-sm object-contain"
          />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold md:text-xl/6 pb-2">{title}</h4>
          <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 ">
            <i className="ri-building-3-line mr-1 md:mr-3"></i>
            {company}
          </p>
          <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
            <i className="ri-map-pin-line mr-1 md:mr-3"></i>
            {location}
          </p>
          <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
            <i className="ri-suitcase-line mr-1 md:mr-3"></i>
            {description}
          </p>
          {date && (
            <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
              <i className="ri-calendar-line mr-1 md:mr-3"></i>
              {date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
