import { useEffect, useState } from "react";

export function useFetchData(apiEndpoint) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [apiEndpoint]);

  return { data, isLoading };
}
