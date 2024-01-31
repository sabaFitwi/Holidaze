import { useEffect, useState } from "react";

export function useFetchData(apiEndpoint) {
  const [data, setData] = useState([]); // Initialize to an empty array
  const [isLoading, setIsLoading] = useState(true);

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
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, isLoading };
}
