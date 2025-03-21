import { Metadata } from "next";
import Page from "./stillingsannonser";
import Data from "./data";

export const metadata: Metadata = {
  title: "Stillingsannonser | ITxBergen",
  description: "Stillingsannonser",
};

export default async function StillingsannonserPage() {
  const data = await Data();
  console.log(data);
  return <Page data={""} />;
}
