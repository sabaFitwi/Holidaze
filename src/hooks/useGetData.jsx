import { useEffect, useState } from "react";

/**
 * Custom React hook for fetching data from a specified API endpoint.
 * @param {string} apiEndpoint - The URL of the API endpoint to fetch data from.
 * @returns {{
 *   data: Array|Object,
 *   isLoading: boolean,
 *   isError: boolean
 * }} An object containing fetched data, loading state, and error state.
 */

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
