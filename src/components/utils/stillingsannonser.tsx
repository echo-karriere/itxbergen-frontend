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
          (a, b) => {
            const aHasDeadline = a.deadline && new Date(a.deadline).getTime();
            const bHasDeadline = b.deadline && new Date(b.deadline).getTime();

            if (aHasDeadline && bHasDeadline) {
              return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            }

            if (aHasDeadline) {
              return -1
            }
            if (bHasDeadline) {
              return 1;
            }
            return 0

          }
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
