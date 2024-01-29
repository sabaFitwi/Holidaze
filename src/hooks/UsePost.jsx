import { useState } from "react";

const usePOST = () => {
  const options = (data, accessToken) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const postRequest = async (url, data, accessToken = null) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(url, options(data, accessToken));
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
