import { useState } from "react";
import Headers from "./useHeader";

function usePut() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
