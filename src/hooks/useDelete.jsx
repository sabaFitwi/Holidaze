import { useState } from "react";
import Headers from "./useHeader";

/**
 * Custom React hook for making DELETE requests to an API endpoint.
 * @returns {{
 *   isLoading: boolean,
 *   error: string|null,
 *   deleteCard: (url: string) => Promise<void>
 * }} An object containing loading state, error message, and function to delete data.
 */

const useDeleteApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCard = async (url) => {
    setIsLoading(true);
    setError(null);
    /**
     * Function to send a DELETE request to the specified URL.
     * @param {string} url - The URL of the resource to be deleted.
     * @returns {Promise<void>} A Promise that resolves after the deletion request is complete.
     */

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: Headers("application/json"),
      });
      if (!response.ok) {
        throw new Error(`Failed to delete `);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteCard };
};

export default useDeleteApi;
