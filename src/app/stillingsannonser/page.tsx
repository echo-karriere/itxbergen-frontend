import { Metadata } from "next";
import Page from "./stillingsannonser";
import Data from "./data";

export const metadata: Metadata = {
  title: "Stillingsannonser | ITxBergen",
  description: "Stillingsannonser",
};

export default async function StillingsannonserPage() {
  const data = await Data();
  console.log(data);
  interface Job {
    title: string;
    company: string;
    location: string[];
    deadline: string;
    currentSlug: string;
    image: string;
    type: string;
  }
  const allJobs = data.map((job: Job) => ({
    title: job.title,
    company: job.company,
    location: job.location,
    deadline: job.deadline,
    currentSlug: job.currentSlug,
    image: job.image,
    type: job.type,
  }));
  return <Page allJobs={allJobs} />;
}
