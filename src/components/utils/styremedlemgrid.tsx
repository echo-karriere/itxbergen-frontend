import Styremedlem from "./styremedlem";
import { client } from "../../app/lib/sanity";

const BoardMembers = [
  {
    image: "/styremedlemmer/fredric.png",
    name: "Fredric Hegland",
    title: "Leder",
    mail: "fredric.hegland@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/fredric-hegland-8a8972206/",
  },
  {
    image: "/styremedlemmer/sigurd.jpg",
    name: "Sigurd Dårflot Olsen",
    title: "Nestleder",
    mail: "sigurd.olsen@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/sigurd-dårflot-olsen-1b7003225/",
  },
  {
    image: "/styremedlemmer/kamil.jpg",
    name: "Kamil Matyjaszczyk",
    title: "Økonomiansvarlig",
    mail: "kamil.matyjaszczyk@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/kamil-matyjaszczyk-a7a08b213/",
  },
  {
    name: "Hasan Al-Ajeel",
    title: "Økonomiassistent",
    mail: "hasan.alajeel@itxbergen.no",
    linkedin: "https://www.linkedin.com/",
  },
  {
    image: "/styremedlemmer/isak.jpg",
    name: "Isak Solberg Hansen",
    title: "Webansvarlig",
    mail: "isak.hansen@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/isak-hansen-a574bb2bb/",
  },
  {
    image: "/styremedlemmer/idris.jpg",
    name: "Idris Elmi",
    title: "Web Assistent",
    mail: "idris.elmi@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/idris-elmi-67939a268/",
  },
  {
    image: "/styremedlemmer/hoang.jpeg",
    name: "Hoang Vinh Nguyen",
    title: "Web Assistent",
    mail: "hvnguyen@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/hv-nguyen/",
  },
  {
    image: "/styremedlemmer/anna.jpg",
    name: "Anna Balke",
    title: "PR Ansvarlig",
    mail: "anna.balke@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/anna-balke-42a0a228b/",
  },
  {
    name: "Brage Nybakk",
    title: "Bedriftsassitent",
    mail: "brage.nybakk@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/brage-nybakk-5014aa29b/",
  },
  {
    image: "/styremedlemmer/christina.png",
    name: "Christina Nguyen",
    title: "Kontaktansvarlig",
    mail: "christina.nguyen@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/christina-nguyen-5ba00b290/",
  },
  {
    name: "Ella Solberg",
    title: "Bedriftsansvarlig",
    mail: "ella.solberg@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/ella-solberg/",
  },
  {
    name: "Emilie Løvik",
    title: "PR Assistent",
    mail: "emilie.lovik@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/emilie-løvik-322059273/",
  },
  {
    image: "/styremedlemmer/emilieT.png",
    name: "Emilie Tryggan",
    title: "Grafiker / UX-Designer",
    mail: "emilie.tryggan@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/emilie-tryggan-8468a9230/",
  },
  {
    name: "Guro Flatås",
    title: "Bedriftsassitent",
    mail: "guro.flatas@itxbergen.no",
    linkedin: "https://www.linkedin.com/in/guroflatas/",
  },
];

interface styremedlem {
  image: string;
  name: string;
  title: string;
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

  const data = await client<styremedlem[]>.fetch(query);
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
