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

export default function Stillingsannonser({ jobs }: StillingsannonserProps) {
  return (
    <div className="">
      {jobs.map((job, index) => (
        <Link key={index} href={`/stillingsannonser/${index}`}>
          <Stillingsannonse {...job} />
        </Link>
      ))}
    </div>
  );
}
