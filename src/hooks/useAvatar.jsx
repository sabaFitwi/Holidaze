import { useState, useEffect } from "react";

/**
 * Custom React hook for managing user avatar and profile data.
 * Retrieves user data from localStorage and provides functions to update the avatar.
 * @returns {{
 *   profileData: {
 *     avatar: string,
 *     email: string,
 *     venueManager: string,
 *     name: string
 *   },
 *   isLoading: boolean,
 *   error: Error|null,
 *   updateAvatar: (newImage: string) => void
 * }} An object containing user profile data, loading state, error state, and function to update avatar.
 */
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
