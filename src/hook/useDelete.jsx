import { useState } from "react";
import Headers from "./useHeader";

const useDeleteApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCard = async (id) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  return { loading, error, deleteCard };
};

export default useDeleteApi;
