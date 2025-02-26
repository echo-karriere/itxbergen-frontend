import Stillingsannonse from "./stillingsannonse";

interface StillingsannonserProps {
  jobs: {
    image: string;
    title: string;
    company: string;
    location: string;
    description: string;
    date?: string;
  }[];
}

export default function Stillingsannonser({ jobs }: StillingsannonserProps) {
  return (
    <div className="">
      {jobs.map((job, index) => (
        <Stillingsannonse key={index} {...job} />
      ))}
    </div>
  );
}
