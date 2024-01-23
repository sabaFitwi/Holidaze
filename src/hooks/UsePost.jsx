import { useState } from "react";
import Headers from "./useHeader";

const usePOST = () => {
  const options = (data) => ({
    method: "POST",
    headers: Headers("application/json"),
    body: JSON.stringify(data),
  });

  const [loading, setLoading] = useState(false);

  const postRequest = async (url, data, accessToken = null) => {
    setLoading(true);

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
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, postRequest };
};

export default usePOST;
