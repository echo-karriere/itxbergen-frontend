import { client } from "@/app/lib/sanity";
import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import Otherthings from "@/components/utils/otherthings";
import { headers } from "next/headers";
import Link from "next/link";

interface event {
  id: number;
  title: string;
  address: string;
  details: string;
}

const events: event[] = [
  {
    id: 0,
    address: "Jonsvollgaten 2",
    details: "Detaljer",
    title: "F*ck up night!",
  },
];

const Data = async () => {
  const query = `*[_type == 'event']`;

  const data = await client.fetch(query);

  return data;
};

const Page = async () => {
  const headerList = headers();
  const id = Number(headerList.get("x-current-path")?.split("/").pop());
  const data = await Data();

  console.log(data);

  const event = events.find((job) => job.id === id);

  if (!event) {
    return <div>nei</div>;
  }
  return (
    <>
      <div className="w-full bg-IXBbg2 shadow-lg shadow-gray mb-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:ml-40 md:m-8 md:mt-28 w-[90%] ml-[1.6rem] md:w-[50%] flex flex-col items-center md:items-start text-center md:text-start">
            <Breadcrumbs customLast={`${event.title}`} />
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              {event.title}
            </h1>
            <p className="text-base">{event.details}</p>
          </div>
          <div className="md:mt-28 mt-5 mb-10 md:w-[20%] flex flex-col items-center justify-center">
            <div className="text-center md:items-start flex flex-col md:justify-between mb-3 justify-center items-center">
              <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                <i className="ri-calendar-line mr-1 md:mr-3"></i>
                6. November 2024
              </p>
              <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                <i className="ri-time-line mr-1 md:mr-3"></i>
                17:00-21:00
              </p>
              <p className="text-gray-600 text-xs md:text-sm/6 my-1 md:m-0">
                <i className="ri-building-3-line mr-1 md:mr-3"></i>
                ITxBergen
              </p>
              <p className="text-gray-600 text-xs md:text-sm/6 mt-1 mb-1 md:m-0">
                <i className="ri-map-pin-line mr-1 md:mr-3"></i>
                {event.address}
              </p>
              <a
                href={`https://www.google.com/maps/place/${event.address.split(" ").join("+")}`}
              >
                <div className="bg-white shadow-md w-36 h-8 rounded text-sm flex items-center justify-center my-3">
                  <i className="ri-map-line mr-1"></i>Hvis på kart{" "}
                  <i className="ri-external-link-fill ml-2" />
                </div>
              </a>

              <div className="bg-gray-900 text-white p-5 rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm max-w-md shadow-lg mt-5 text-center md:text-start">
                <div className="justify-center md:justify-start font-bold">
                  <i className="ri-error-warning-line mr-1"></i>

                  <span>Påmelding nødvendig</span>
                </div>

                <p className="mt-2 text-sm text-gray-300">
                  For å kunne delta på dette arrangementet må du melde deg på.
                  Trykk på knappen under for å gå til påmeldingssiden.
                </p>

                <Link
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center bg-[#A7E6E0] text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-[#8fd1cb] transition"
                >
                  Gå til påmelding
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Otherthings />
    </>
  );
};

export default Page;
