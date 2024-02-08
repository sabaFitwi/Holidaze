import { useEffect, useState } from "react";

export function useFetchData(apiEndpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, isLoading, isError };
}
