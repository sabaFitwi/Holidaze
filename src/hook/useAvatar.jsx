import { useState, useEffect } from "react";

const useAvatar = () => {
  const [profileData, setProfileData] = useState({
    avatar: "",
    email: "",
    venueManager: "",
    name: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const storedUserData =
          JSON.parse(localStorage.getItem("UserData")) || {};
        setProfileData((prevData) => ({ ...prevData, ...storedUserData }));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
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

  return { profileData, loading, error, updateAvatar };
};

export default useAvatar;
