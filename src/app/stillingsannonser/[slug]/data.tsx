import { client } from "../../lib/sanity";

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

export default Data;
