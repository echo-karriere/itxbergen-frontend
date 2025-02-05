import Image from "next/image";

const Styremedlem = ({
  image = "/person.jpg",
  name,
  title,
  mail = "xxxxxxxx.xxxxxxxxxx@itxbergen.no",
}) => {
  return (
    <>
      <div className="flex">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="h-[9rem] w-[9rem] rounded-tl-[25px] rounded-tr-[0.3rem] rounded-br-[1.5rem] rounded-bl-[0.4rem] shadow-md"
        />
        <div className="pl-3">
          <h3 className="font-montSerrat font-bold text-2xl/8">{name}</h3>
          <p className="font-sourceSans text-[#7E57C2] text-sm/8">{title}</p>
          <p className="font-sourceSans text-sm/8 hover:text-[#7E57C2] hover:underline">
            {mail}
          </p>
          <i className="ri-linkedin-fill"></i>
        </div>
      </div>
    </>
  );
};

export default Styremedlem;
