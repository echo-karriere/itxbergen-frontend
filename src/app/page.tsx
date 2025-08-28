import React from "react";

import { Metadata } from "next";
import { client } from "./lib/sanity";
import PageHeader from "./home/page-header";
import SectionAbout from "./home/section-about";
import SectionNews from "./home/section-news";
import SectionSponsors from "./home/section-sponsors";

interface news {
  image: string;
  title: string;
  currentSlug: string;
  _createdAt: string;
}

export const metadata: Metadata = {
  title: "ITxBergen",
  description: "Karrieredag for IT-studenter i Bergen",
};

const Data = async () => {
  const query = `*[_type == 'news']{
    "image": newsimage.asset->url,
    title,
    "currentSlug": slug.current,
    _createdAt,

}`;

  const sanityData = await client.fetch<news[]>(query);

  return sanityData;
};

export default async function Home() {
  const sanityData = await Data();
  return (
    <main>
      <PageHeader />
      <SectionAbout />
      <SectionNews data={sanityData} />
      <SectionSponsors />
    </main>
  );
}
