import { useState, useEffect } from "react";

const useAvatar = () => {
  const [profileData, setProfileData] = useState({
    avatar: "",
    email: "",
    venueManager: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const storedUserData =
          JSON.parse(localStorage.getItem("UserData")) || {};
        setProfileData((prevData) => ({ ...prevData, ...storedUserData }));
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, []);

  const updateAvatar = (newImage) => {
    setProfileData((prevData) => ({
      ...prevData,
      avatar: newImage,
    }));
  };

  return { profileData, isLoading, error, updateAvatar };
};

export default useAvatar;
