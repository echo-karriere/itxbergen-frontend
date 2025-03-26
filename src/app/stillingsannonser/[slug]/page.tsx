import Data from "./data";
import { headers } from "next/headers";

const Page = async () => {
  const headerList = headers();
  const id = headerList.get("x-current-path")?.split("/").pop();
  if (id) {
    const data = await Data(id);
    console.log(data);
  }

  return <div>pge</div>;
};

export default Page;
