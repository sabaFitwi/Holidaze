import { useState } from "react";
import Headers from "./useHeader";

/**
 * Custom React hook for making PUT requests to update data.
 * @returns {{
 *   updateItem: (url: string, updateData: Object) => Promise<Object>,
 *   isUpdating: boolean,
 *   isError: boolean,
 *   errorMessage: string
 * }} An object containing function to update data, loading state, error state, and error message.
 */
function usePut() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Function to update an item by sending a PUT request to the specified URL with update data.
   * @param {string} url - The URL to send the PUT request to.
   * @param {Object} updateData - The data to be updated.
   * @returns {Promise<Object>} A Promise that resolves with the response data from the server.
   */

  const updateItem = async (url, updateData) => {
    setIsUpdating(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: Headers("application/json"),
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateItem, isUpdating, isError, errorMessage };
}

export default usePut;
