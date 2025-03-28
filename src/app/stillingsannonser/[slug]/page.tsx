import Image from "next/image";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import { client } from "../../lib/sanity";
import { headers } from "next/headers";
import { PortableText } from "@portabletext/react"; // Add Portable Text renderer
import Sharebutton from "./sharebutton";
import { PortableTextBlock } from "@portabletext/react";
import Custom404 from "@/app/404";

interface jobPosting {
  title: string;
  image: string;
  company: string;
  location: string[];
  type: string;
  deadline: string;
  description: PortableTextBlock;
  link: string;
}

const Data = async (id: string) => {
  const query = `*[_type == "joblisting" && slug.current == $id][0] {
      title,
      "image": logo.asset->url,
      company,
      location,
      type,
      deadline,
      description,
      link
    }`;

  const data = await client.fetch<jobPosting>(query, { id });

  return data;
};

const Page = async () => {
  const headerList = headers();
  const id = headerList.get("x-current-path")?.split("/").pop();

  if (id) {
    try {
      const data = await Data(id);

      const {
        title,
        company,
        image,
        type,
        location,
        description,
        deadline,
        link,
      } = data;

      if (!data) {
        return (
          <div>Stillingsannonser er ikke klar enda. Kom tilbake senere:)</div>
        );
      }
      return (
        <div className="md:ml-12 md:mt-12 mt-12 w-[90%] ml-[1.6rem]">
          <div className="flex flex-col maxwidth md:flex-row">
            <div className="maxwidth md:w-[50%] flex flex-col items-center md:items-start text-start">
              <Breadcrumbs customLast={`${company}`} />
              <h1 className="text-3xl md:text-4xl font-bold mb-9 mt-4">
                {title}
              </h1>
              <div className="md:w-[90%] portable-text">
                <PortableText value={description} />
              </div>
            </div>
            <div className="maxwidth md:mt-12 md:ml-6 mb-10 md:w-[20%] flex flex-col items-center md:items-start justify-start">
              <Image
                src={image}
                alt={company + " image"}
                unoptimized
                width={300}
                height={300}
                className="w-36 h-36 mb-5 rounded mt-16 md:mt-0"
              />

              <div className="text-left md:flex md:flex-col md:justify-between mb-3">
                <p className="text-gray-600 text-xs md:text-sm/6 my-1 md:m-0 font-bold">
                  <i className="ri-building-3-line mr-1"></i>
                  {company}
                </p>
                <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                  <i className="ri-map-pin-line mr-1"></i>
                  {location.join(", ")}
                </p>
                <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                  <i className="ri-suitcase-line mr-1"></i>
                  {type}
                </p>
                {deadline && (
                  <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                    <i className="ri-calendar-line mr-1"></i>
                    {deadline}
                  </p>
                )}
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Trykk her for å gå til søknaden for stillingen - ${title}, Ekstern lenke.`}
                className="bg-blue-500 hover:bg-blue-700 md:w-full w-[60%] text-white font-bold py-2 px-4 rounded flex justify-center items-center focus:outline-none focus:ring-4 focus:ring-yellow-400"
              >
                <span className="text-center md:w-full w-[60%]">
                  Gå til søknad
                </span>
                <i className="ri-external-link-fill ml-2" />
              </a>
              <Sharebutton company={company} />
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return <Custom404 />;
    }
  } else {
    return <Custom404 />;
  }
};

export default Page;
