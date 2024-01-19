import { useEffect, useState } from "react";

import Headers from "./useHeader";

const useApi = (url, method, body) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url, {
          method: method,
          headers: Headers("application/json"),
          body: JSON.stringify(body),
        });
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url, method, body]);
  return { data, isLoading, isError };
};

export default useApi;
