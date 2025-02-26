"use client";

import { useState } from "react";
import Otherthings from "@/components/utils/otherthings";
import Stillingsannonser from "@/components/utils/stillingsannonser";
import Breadcrumbs from "@/components/utils/breadcrumbs";
import DropdownSearch from "@/components/utils/dropdown-search";

const Page = () => {
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [typeSearchTerm, setTypeSearchTerm] = useState("");

  const allJobs = [
    {
      image: "/statensvegvesen.png",
      title: "Fra sommerjobb til samfunnsnyttig rolle!",
      company: "Statens vegvesen",
      location: "Bergen, Oslo, Trondheim, Drammen, Skien, Moss",
      description: "Sommerjobb",
      date: "10. Januar 2025",
    },
    {
      image: "/statensvegvesen.png",
      title: "Fra sommerjobb til samfunnsnyttig rolle!",
      company: "Statens vegvesen",
      location: "Bergen, Oslo, Trondheim, Drammen, Skien, Moss",
      description: "Sommerjobb",
      date: "10. Januar 2025",
    },
    {
      image: "/knowit.png",
      title: "Nyutdannede utviklere i Bergen 2025",
      company: "Knowit",
      location: "Bergen",
      description: "Fulltid",
    },
  ];

  const filteredJobs = allJobs.filter(
    (job) =>
      job.company.toLowerCase().includes(companySearchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationSearchTerm.toLowerCase()) &&
      job.description.toLowerCase().includes(typeSearchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="m-8 md:m-16">
        <Breadcrumbs current={"Stillingsannonser"} />
        <h1 className="text-3xl md:text-4xl font-bold mb-9">
          <span>Stillingsannonser</span>
        </h1>
        <div className="flex flex-col md:flex-row">
          <div>
            <DropdownSearch
              filterFrom={"bedrift"}
              onSearch={setCompanySearchTerm}
            />
            <DropdownSearch
              filterFrom={"sted"}
              onSearch={setLocationSearchTerm}
            />
            <DropdownSearch filterFrom="type" onSearch={setTypeSearchTerm} />
          </div>
          <Stillingsannonser jobs={filteredJobs} />
        </div>
        <Otherthings />
      </div>
    </>
  );
};

export default Page;
