import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/sanity.client"; // Adjust import path as needed

export async function getCookies() {
  return sanityFetch({
    query: groq`*[_type == "cookies"]{
      _id,
      _updatedAt,
      title,
      content,
    }`,
    params: {},
    revalidate: 120,
    tags: [],
  });
}
