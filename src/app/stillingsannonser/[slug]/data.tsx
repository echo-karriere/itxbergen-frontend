import { client } from "../../lib/sanity";

interface SanityParams {
  slug: string;
  // Add other parameters here if needed
}

const Data = async ({ slug }: { slug: string }) => {
  const query = `*[_type == "job" && slug.current == $slug][0] {
    title,
    "image": logo.asset->url,
    company,
    location,
    type,
    deadline,
    description
  }`;

  const params: SanityParams = { slug }; // Explicitly typed params

  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default Data;
