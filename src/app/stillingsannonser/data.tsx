import { client } from "../lib/sanity";
import type { SanityDocument } from "next-sanity";

const Data = async () => {
  const query = `*[_type == 'joblisting'] {
    title,
    logo,
    company,
    location,
    type,
    deadline,
    "currentSlug": slug.current,
}`;

  const data = client.fetch(query);

  console.log(data);
  return data;
};

export default Data;
