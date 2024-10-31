import { getPrivacy } from "@/lib/queries/sanityPrivacy";
import { privacyType } from "@/lib/sanity/sanity.types";
import { PortableText } from "next-sanity";

export default async function Privacy() {
  const data: privacyType[] = await getPrivacy();

  return (
    <>
      <div className="singleton-container">
        <h1 className="singleton-header">{data[0].title}</h1>
        <p className="singleton-date">
          Sist oppdatert:{" "}
          {new Date(data[0]._updatedAt).toLocaleDateString("nb")}
        </p>
        <div className="prose dark:prose-invert mb-12">
          <PortableText value={data[0].content} />
        </div>
      </div>
    </>
  );
}
