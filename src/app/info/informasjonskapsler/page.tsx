import { getCookies } from "@/lib/sanity/queries/sanityCookies";
import { cookiesType } from "@/lib/sanity/types/sanityCookies";
import { PortableText } from "next-sanity";

export default async function Cookies() {
  const data: cookiesType[] = await getCookies();

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
