import { useState } from "react";
import Headers from "./useHeader";

const useDeleteApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCard = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
        {
          method: "DELETE",
          headers: Headers("application/json"),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking");
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
