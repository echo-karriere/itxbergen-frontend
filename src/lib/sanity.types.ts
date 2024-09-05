import { PortableTextBlock } from "sanity";

export type privacyType = {
  _id: string,
  title: string,
  content: PortableTextBlock[],   
};