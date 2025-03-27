import { headers } from "next/headers";
import { client } from "../lib/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import { groq } from "next-sanity";
import Custom404 from "../404";

interface newsProps {
  title: string;
  image: string;
  _createdAt: string;
  _updatedAt: string;
  content: PortableTextBlock;
}

function generateSlug(id: string) {
  return id
    .split("%20")
    .map((w) => w.toLowerCase())
    .join("-");
}

const Data = async (id: string) => {
  const correctId = generateSlug(id);

  const data = await client.fetch<newsProps>(
    groq`*[_type == "news" && slug.current == $correctId][0] {
      title,
      "image": newsimage.asset->url,
      _createdAt,
      _updatedAt,
      content,
    }`,
    { correctId },
  );

  return data;
};

const Page = async () => {
  const headerList = headers();
  const id = headerList.get("x-current-path")?.split("/").pop();
  if (id) {
    const data = await Data(id);
    try {
      const { title, image, _createdAt, _updatedAt, content } = data;

      return (
        <>
          <div className="justify-center">
            <div className="maxwidth md:pt-[3rem] pt-4 px-[1.8rem] md:px-32">
              <Breadcrumbs />

              <div className="flex flex-col pb-14">
                <h1 className="text-3xl md:text-4xl font-bold pb-8 pt-4">
                  <span>{title}</span>
                </h1>
                <div className="md:mr-3 w-[80%]">
                  {image && (
                    <Image
                      className="w-[40rem] h-auto"
                      src={image}
                      unoptimized
                      alt={""}
                      width={500}
                      height={500}
                    />
                  )}

                  <p
                    className={`text-sm text-gray-500 mt-4 ${_createdAt !== _updatedAt ? "mb-1" : "mb-7"}`}
                  >
                    Publisert:{" "}
                    {new Date(_createdAt).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "Europe/Oslo",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>

                  {_createdAt !== _updatedAt ? (
                    <p className="text-sm text-gray-500 mb-7">
                      Oppdatert:{" "}
                      {new Date(_updatedAt).toLocaleDateString("no-NO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "Europe/Oslo",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  ) : null}

                  <div className="text-base/8 portable-text pt-4">
                    <PortableText value={content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } catch (error) {
      return <Custom404 />;
    }
  } else {
    <Custom404 />;
  }
};

export default Page;
