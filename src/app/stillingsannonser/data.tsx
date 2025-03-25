import { client } from "../lib/sanity";

const Data = async () => {
  const query = `*[_type == 'joblisting'] {
    title,
    "image": logo.asset->url,
    company,
    location,
    type,
    deadline,
    "currentSlug": slug.current,
}`;

  const data = client.fetch(query);

  return data;
};

export default Data;
