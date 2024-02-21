import { useState } from "react";
import Headers from "./useHeader";

/**
 * Custom React hook for making POST requests to a specified URL with JSON data.
 * @returns {{
 *   isLoading: boolean,
 *   isError: boolean,
 *   postRequest: (url: string, data: Object) => Promise<{ success: boolean, results?: any, error?: string }>
 * }} An object containing loading state, error state, and function to make a POST request.
 */
const usePOST = () => {
  /**
   * Function to generate options for the POST request.
   * @param {Object} data - The JSON data to be sent in the request body.
   * @returns {Object} Options for the POST request including method, headers, and body.
   */
  const options = (data) => ({
    method: "POST",
    headers: Headers("application/json"),
    body: JSON.stringify(data),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  /**
   * Function to make a POST request to the specified URL with JSON data.
   * @param {string} url - The URL to send the POST request to.
   * @param {Object} data - The JSON data to be sent in the request body.
   * @returns {Promise<{ success: boolean, results?: any, error?: string }>} A Promise that resolves with the result of the POST request.
   */
  const postRequest = async (url, data) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(url, options(data));
      const results = await response.json();
      console.log(results);

      if (!response.ok) {
        const error =
          (results.errors && results.errors[0].message) ||
          "Something went wrong";
        throw new Error(error);
      }

      return { success: true, results };
    } catch (error) {
      setIsError(true);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, postRequest };
};

export default usePOST;
