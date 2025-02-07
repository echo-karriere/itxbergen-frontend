import Styremedlem from "./styremedlem";

const BoardMembers = [
  {
    image: "/fredric.png",
    name: "Fredric Hegland",
    title: "Leder",
    mail: "fredric.hegland@itxbergen.no",
  },
  { name: "Sigurd Dårflot Olsen", title: "Nestleder" },
  {
    name: "Kamil Matyjaszczyk",
    title: "Økonomiansvarlig",
  },
  {
    name: "Maella Irebe Muganga",
    title: "Økonomiansvarlig (avtroppende)",
  },
  { name: "Hasan Al-Ajeel", title: "Økonomiassistent" },
  { name: "Isak Solberg Hansen", title: "Webansvarlig" },
];

const StyremedlemGrid = () => {
  return (
    <div className="w-[80%] mx-auto pt-5">
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
