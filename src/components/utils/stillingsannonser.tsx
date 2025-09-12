import Stillingsannonse from "./stillingsannonse";
import Link from "next/link";

interface StillingsannonserProps {
  jobs: {
    image: string;
    title: string;
    company: string;
    location: string;
    type: string;
    date?: string;
  }[];
}

interface Job {
  jobs: {
    title: string;
    company: string;
    location: string[];
    deadline: string;
    currentSlug: string;
    image: string;
    type: string;
  }[];
}

export default function Stillingsannonser({ jobs }: Job) {
  return (
    <div className="">
      {jobs
        .sort(
          (a, b) =>
            new Date(b.deadline).getTime() - new Date(a.deadline).getTime(),
        )
        .map((job, index) => (
          <Link key={index} href={`/stillingsannonser/${job.currentSlug}`}>
            <Stillingsannonse
              image={job.image}
              title={job.title}
              company={job.company}
              location={job.location.join(", ")}
              type={job.type}
              date={job.deadline}
            />
          </Link>
        ))}
    </div>
  );
}
