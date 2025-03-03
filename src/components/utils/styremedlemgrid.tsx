import Styremedlem from "./styremedlem";

const BoardMembers = [
  {
    image: "/styremedlemmer/fredric.png",
    name: "Fredric Hegland",
    title: "Leder",
    mail: "fredric.hegland@itxbergen.no",
  },
  {
    image: "/styremedlemmer/sigurd.jpg",
    name: "Sigurd Dårflot Olsen",
    title: "Nestleder",
    mail: "sigurd.olsen@itxbergen.no",
  },
  {
    image: "/styremedlemmer/kamil.jpg",
    name: "Kamil Matyjaszczyk",
    title: "Økonomiansvarlig",
    mail: "kamil.matyjaszczyk@itxbergen.no",
  },
  {
    name: "Hasan Al-Ajeel",
    title: "Økonomiassistent",
    mail: "hasan.alajeel@itxbergen.no",
  },
  {
    image: "/styremedlemmer/isak.jpg",
    name: "Isak Solberg Hansen",
    title: "Webansvarlig",
    mail: "isak.hansen@itxbergen.no",
  },
  {
    image: "/styremedlemmer/idris.jpg",
    name: "Idris Elmi",
    title: "Web Assistent",
    mail: "idris.elmi@itxbergen.no",
  },
  {
    image: "/styremedlemmer/hoang.jpeg",
    name: "Hoang Vinh Nguyen",
    title: "Web Assistent",
    mail: "hvnguyen@itxbergen.no",
  },
  {
    image: "/styremedlemmer/anna.jpg",
    name: "Anna Balke",
    title: "PR Ansvarlig",
    mail: "anna.balke@itxbergen.no",
  },
  {
    name: "Brage Nybakk",
    title: "Bedriftsassitent",
    mail: "brage.nybakk@itxbergen.no",
  },
  {
    image: "/styremedlemmer/christina.png",
    name: "Christina Nguyen",
    title: "Kontaktansvarlig",
    mail: "christina.nguyen@itxbergen.no",
  },
  {
    name: "Ella Solberg",
    title: "Bedriftsansvarlig",
    mail: "ella.solberg@itxbergen.no",
  },
  {
    name: "Emilie Løvik",
    title: "PR Assistent",
    mail: "emilie.lovik@itxbergen.no",
  },
  {
    image: "/styremedlemmer/emilieT.png",
    name: "Emilie Tryggan",
    title: "Grafiker / UX-Designer",
    mail: "emilie.tryggan@itxbergen.no",
  },
  {
    name: "Guro Flatås",
    title: "Bedriftsassitent",
    mail: "guro.flatas@itxbergen.no",
  },
];

const StyremedlemGrid = () => {
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
        { length: Math.ceil(BoardMembers.length / 2) },
        (_, rowIndex) => (
          <ol
            key={rowIndex}
            className="w-full md:flex md:justify-between md:pt-5"
          >
            {BoardMembers.slice(rowIndex * 2, rowIndex * 2 + 2).map(
              (member, index) => (
                <li key={index} className="w-full md:w-[48%] mb-5 mt-5">
                  {" "}
                  {/* Adjust width to avoid spacing issues */}
                  <Styremedlem {...member} />
                </li>
              ),
            )}
          </ol>
        ),
      )}
    </div>
  );
};

export default StyremedlemGrid;
