import { useEffect, useState } from "react";

import Headers from "./useHeader";

/**
 * Custom hook for making API requests.
 * @param {string} url - The URL to make the API request to.
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object} body - The request body to be sent along with the request.
 * @returns {{
 *   data: Array|Object,
 *   isLoading: boolean,
 *   isError: boolean
 * }} An object containing data fetched from the API, loading state, and error state.
 */
const useApi = (url, method, body) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /**
     * Asynchronous function to fetch data from the provided URL.
     */
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
