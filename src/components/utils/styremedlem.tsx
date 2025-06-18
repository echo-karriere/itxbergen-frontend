import Image from "next/image";

interface StyremedlemProps {
  image?: string;
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
}

const Styremedlem = ({
  image = "/styremedlemmer/logo_undefined.png",
  name,
  role,
  email = "xxxxxxxx.xxxxxxxxxx@itxbergen.no",
  linkedin,
}: StyremedlemProps) => {
  return (
    <>
      <div className="flex pt-2 pb-2 md:pt-0 md:pb-0">
        <Image
          src={image}
          alt={name}
          unoptimized
          width={200}
          height={200}
          className="h-[6rem] w-[6rem] md:h-[9rem] md:w-[9rem] rounded-tl-[25px] rounded-tr-[0.3rem] rounded-br-[1.5rem] rounded-bl-[0.4rem] shadow-md object-cover"
          draggable="false"
        />
        <div className="pl-3">
          <h3 className="font-montSerrat font-bold md:text-2xl/8">{name}</h3>
          <p className="font-sourceSans text-[#7E57C2] text-sm md:text-sm/8">
            {role}
          </p>
          <div className="flex flex-col">
            <a
              href={`mailto:${email}`}
              className="font-sourceSans text-sm md:text-sm/8 hover:text-[#7E57C2] hover:underline"
            >
              {email}
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2"
              >
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Styremedlem;
