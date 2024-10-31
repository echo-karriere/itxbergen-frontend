import { PortableTextBlock } from "sanity";

export type privacyType = {
  _id: string;
  _updatedAt: string;
  title: string;
  content: PortableTextBlock[];
};
