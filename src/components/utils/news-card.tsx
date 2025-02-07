import Image from "next/image";

const Card = ({ image, title, date, width = "265px", height = "290px" }) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="bg-white border border-gray-200 rounded-lg hover:shadow-md hover:bg-IXBbg1"
    >
      {/* Purple bar */}
      <div className="h-[3px] w-full bg-[#9747FF] rounded-t-lg"></div>
      <div className="p-2">
        <Image
          className="w-full rounded-[3px]"
          src={image}
          alt=""
          width={800}
          height={1200}
        />
      </div>

      <div className="p-4">
        <h5 className="font-montSerrat font-bold text-black mb-2 leading-7">
          {title}
        </h5>

        <p className="text-gray-500 text-[10px]">Publisert: {date}</p>
      </div>
    </div>
  );
};

export default Card;
