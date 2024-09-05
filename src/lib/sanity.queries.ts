import { groq } from "next-sanity";
import { client } from "./sanity.client";


export async function getPrivacy() {
  return client.fetch(
    groq`*[_type == "privacy"]{
      _id,
      title,
      content,
    }`
  );
}