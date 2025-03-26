import { Description } from "@radix-ui/react-dialog";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { headers } from "next/headers";
import { PortableText } from "@portabletext/react"; // Add Portable Text renderer

const Data = async (id: string) => {
  const query = `*[_type == "joblisting" && slug.current == $id][0] {
      title,
      "image": logo.asset->url,
      company,
      location,
      type,
      deadline,
      description
    }`;

  const data = await client.fetch(query, { id });

  return data;
};

const Page = async () => {
  const headerList = headers();
  const id = headerList.get("x-current-path")?.split("/").pop();

  if (id) {
    const data = await Data(id);

    const { title, company, image, type, location, description, deadline } =
      data;

    if (!data) {
      return (
        <div>Stillingsannonser er ikke klar enda. Kom tilbake senere:)</div>
      );
    }
    return (
      <div className="flex flex-col md:flex-row md:ml-40 md:m-8 md:mt-28 w-[90%] ml-[1.6rem]">
        <div className="md:w-[50%] flex flex-col items-center md:items-start text-center md:text-start">
          <Breadcrumbs customLast={`${company}`} />
          <h1 className="text-3xl md:text-4xl font-bold mb-9 mt-4">{title}</h1>
          <div className="md:w-[90%]">
            <PortableText value={description} />
          </div>
        </div>
        <div className="mb-10 md:w-[20%] flex flex-col items-center md:items-start justify-start">
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
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Trykk her for å gå til søknaden for stillingen - ${title}, Ekstern lenke.`}
            className="bg-blue-500 hover:bg-blue-700 md:w-full w-[60%] text-white font-bold py-2 px-4 rounded flex justify-center items-center focus:outline-none focus:ring-4 focus:ring-yellow-400"
          >
            <span className="text-center md:w-full w-[60%]">Gå til søknad</span>
            <i className="ri-external-link-fill ml-2" />
          </a>
          {/* <button */}
          {/*   onClick={() => { */}
          {/*     // open the share dialog */}
          {/*     if (navigator.share) { */}
          {/*       navigator */}
          {/*         .share({ */}
          {/*           title: `Ta en titt på denne stillingsannonsen til ${company} på ITxBERGEN sin nettside.`, */}
          {/*           url: `https://www.itxbergen.no/karrieredag/404`, */}
          {/*         }) */}
          {/*         .then(() => console.log("Successful share")) */}
          {/*         .catch((error) => console.log("Error sharing", error)); */}
          {/**/}
          {/*       document.getElementById("shareButton")!.innerHTML = */}
          {/*         "Velg hvordan du vil dele stillingen"; */}
          {/**/}
          {/*       setTimeout(() => { */}
          {/*         document.getElementById("shareButton")!.innerHTML = */}
          {/*           "Del stillingen på nytt"; */}
          {/*       }, 3000); */}
          {/*     } else { */}
          {/*       // fallback to copy to clipboard */}
          {/*       const url = window.location.href; */}
          {/*       const el = document.createElement("textarea"); */}
          {/*       el.value = url; */}
          {/*       document.body.appendChild(el); */}
          {/*       el.select(); */}
          {/*       document.execCommand("copy"); */}
          {/*       document.body.removeChild(el); */}
          {/**/}
          {/*       // change id to "shareButton" to show the text for 3 seconds */}
          {/*       document.getElementById("shareButton")!.innerHTML = */}
          {/*         "Lenke kopiert til utklippstavlen"; */}
          {/**/}
          {/*       setTimeout(() => { */}
          {/*         document.getElementById("shareButton")!.innerHTML = */}
          {/*           "Del stillingen på nytt"; */}
          {/*       }, 3000); */}
          {/*     } */}
          {/*   }} */}
          {/*   className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 w-[60%] md:w-full font-semibold py-2 px-4 flex justify-center items-center rounded focus:outline-none focus:ring-4 focus:ring-yellow-400" */}
          {/* > */}
          {/*   <span id="shareButton" className="text-center "> */}
          {/*     Del stillingen */}
          {/*   </span> */}
          {/* </button> */}
        </div>
      </div>
    );
  }
};

export default Page;
