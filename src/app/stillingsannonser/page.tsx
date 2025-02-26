import Otherthings from "@/components/utils/otherthings";
import Stillingsannonser from "@/components/utils/stillingsannonser";
import Breadcrumbs from "@/components/utils/breadcrumbs";

const page = () => {
  return (
    <>
      <div className="m-8">
        <Breadcrumbs current={"Stillingsannonser"} />
        <Stillingsannonser
          jobs={[
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
          ]}
        />
        <Otherthings />
      </div>
    </>
  );
};

export default page;
