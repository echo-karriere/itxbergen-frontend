import { getPrivacy } from "@/lib/sanity.queries";
import { privacyType } from "@/lib/sanity.types";

export default async function Home() {
  const data: privacyType[] = await getPrivacy();

  return (
    <>
    <h1>{data[0].title}</h1>
    

    </>
  );
}