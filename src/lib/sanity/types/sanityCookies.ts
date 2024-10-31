import { PortableTextBlock } from "sanity";

export type cookiesType = {
  _id: string;
  _updatedAt: string;
  title: string;
  content: PortableTextBlock[];
};
