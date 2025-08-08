import Styremedlem from "./styremedlem";
import { client } from "../../app/lib/sanity";


interface styremedlem {
  image: string;
  name: string;
  role: string;
  mail: string;
  linkedin: string;
}

const Data = async () => {
  const query = `*[_type == 'committeeMember'] {
  "image": profilePicture.asset->url,
  name,
  role,
  email,
  linkedin
  }`;

  const data = await client.fetch<styremedlem[]>(query);
  return data;
};

const StyremedlemGrid = async () => {
  const boardMembers = await Data();
  return (
    <div className="w-[80%] mx-auto">
      <div>
        <h2 className="font-montSerrat font-bold text-3xl pb-9">
          Møt våre styremedlemmer!
        </h2>
        <p className="font-sourceSans text-[#121212] text-[1rem]/8 pb-9 md:w-[24rem]">
          Her finner du våre styremedlemmer, sammen med e-post og LinkedIn for å
          komme i kontakt med dem.
        </p>
      </div>
      {Array.from(
        { length: Math.ceil(boardMembers.length / 2) },
        (_, rowIndex) => (
          <ol
            key={rowIndex}
            className="w-full md:flex md:justify-between md:pt-5"
          >
            {boardMembers
              .sort((a, b) => {
                if (a.role === "Leder") return -1;
                if (b.role === "Leder") return 1;

                if (a.role === "Nestleder") return -1;
                if (b.role === "Nestleder") return 1;

                return 0

              })
              .slice(rowIndex * 2, rowIndex * 2 + 2)
              .map((member, index) => (
                <li key={index} className="w-full md:w-[48%] mb-5 mt-5">
                  {" "}
                  {/* Adjust width to avoid spacing issues */}
                  <Styremedlem {...member} />
                </li>
              ))}
          </ol>
        ),
      )}
    </div>
  );
};

export default StyremedlemGrid;
