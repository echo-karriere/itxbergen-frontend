import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity.client"; 

export async function getPrivacy() {
  return sanityFetch({
    query: groq`*[_type == "privacy"]{
      _id,
      _updatedAt,
      title,
      content,
    }`,
  });
}
