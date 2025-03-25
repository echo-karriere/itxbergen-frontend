"use client";

import Page from "./jobpage";
import Data from "./data";
import { usePathname } from "next/navigation";

const CurrentPage = () => {
  const id = usePathname().split("/").pop();
  if (id) {
    const data = Data({ slug: id });
    console.log(data);
    return <Page />;
  } else {
    return <>En feil oppstod</>;
  }
};

export default CurrentPage;
