import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import Otherthings from "@/components/utils/otherthings";

const page = () => {
  return (
    <>
      <div className="w-full h-96 bg-IXBbg2 shadow-lg shadow-gray mb-5">
        <div className="flex flex-col md:flex-row m-8 md:m-0">
          <div className="md:ml-40 md:m-8 md:mt-28 w-[90%] ml-[1.6rem] md:w-[50%] flex flex-col items-center md:items-start text-center md:text-start">
            <Breadcrumbs />
            <h1 className="text-3xl md:text-4xl font-bold mb-9 mt-4">
              F*ck up night!
            </h1>
          </div>
        </div>
      </div>
      <Otherthings />
    </>
  );
};

export default page;
