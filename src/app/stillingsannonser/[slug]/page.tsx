"use client";

import Page from "./jobpage";
import Data from "./data";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const CurrentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = usePathname().split("/").pop();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const dat = await Data({ slug: id });
        setData(dat);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return <Page />;
};

export default CurrentPage;
