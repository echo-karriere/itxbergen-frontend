import Image from "next/image";

interface StyremedlemProps {
  image?: string;
  name: string;
  title: string;
  mail?: string;
}

const Styremedlem = ({
  image = "/person.jpg",
  name,
  title,
  mail = "xxxxxxxx.xxxxxxxxxx@itxbergen.no",
}: StyremedlemProps) => {
  return (
    <>
      <div className="flex pt-2 pb-2 md:pt-0 md:pb-0">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="h-[6rem] w-[6rem] md:h-[9rem] md:w-[9rem] rounded-tl-[25px] rounded-tr-[0.3rem] rounded-br-[1.5rem] rounded-bl-[0.4rem] shadow-md object-cover"
          draggable="false"
        />
        <div className="pl-3">
          <h3 className="font-montSerrat font-bold md:text-2xl/8">{name}</h3>
          <p className="font-sourceSans text-[#7E57C2] text-sm md:text-sm/8">
            {title}
          </p>
          <p className="font-sourceSans text-sm md:text-sm/8 hover:text-[#7E57C2] hover:underline">
            {mail}
          </p>
          <i className="ri-linkedin-fill"></i>
        </div>
      </div>
    </>
  );
};

export default Styremedlem;
