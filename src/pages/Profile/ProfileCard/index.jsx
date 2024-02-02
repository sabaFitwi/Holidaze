import React, { useState, useEffect } from "react";
import Headers from "../../../hooks/useHeader";
import { FaUser } from "react-icons/fa";
import Modals from "../../../components/Ui/Modal"; // Rename Modal to Modals
import AvatarInput from "../AvatarInput";
import useAvatar from "../../../hooks/useAvatar";
import { profileUrl } from "../../../api";

const ProfileCard = () => {
  const { profileData, updateAvatar } = useAvatar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null); // State to store the new avatar

  useEffect(() => {}, [profileData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (newAvatar) {
      updateAvatar(newAvatar);

      const updatedUserData = {
        ...profileData,
        avatar: newAvatar,
      };

      localStorage.setItem("UserData", JSON.stringify(updatedUserData));
      const profile = profileUrl;
      const apiUrl = profile + `/${profileData.name}/media`;

      fetch(apiUrl, {
        method: "PUT",
        headers: Headers("application/json"),
        body: JSON.stringify(updatedUserData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Avatar updated successfully", data);
          setIsModalOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating avatar", error);
        });
    }
  };

  const handleAvatarChange = (file) => {
    setNewAvatar(file);
  };

  return (
    <div className="flex justify-around items-center lg:items-start lg:min-h-screen p-4 mt-2">
      {profileData && (
        <div className="flex flex-col  sm:flex-row lg:flex-col justify-center  sm:max-w-1/3 p-6 shadow-lg sticky top-40 rounded-xl sm:px-12">
          {profileData.avatar ? (
            <img
              src={profileData.avatar}
              alt="users avatar"
              className="w-20 h-20 sm:w-32 sm:h-32 mx-auto rounded-full"
            />
          ) : (
            <FaUser className="w-20 h-20 sm:w-32 sm:h-32 mx-auto text-gray-500" />
          )}
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-sm lg:text-xl font-semibold sm:text-2xl">
                {profileData.name}
              </h2>
              <p className="px-5 text-xs sm:text-base">
                {profileData.venueManager
                  ? "You are a Venue Manager"
                  : "You are a Customer"}
              </p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 divide-x divide-gray-700 align-center">
              <button className="whitespace-nowrap">Send me email</button>
              <button
                className="whitespace-nowrap pl-3"
                onClick={() => setIsModalOpen(true)}
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modals
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleSaveChanges}
          title="Edit Avatar"
        >
          <h2>Upload New Avatar</h2>
          <AvatarInput onChange={handleAvatarChange} />
        </Modals>
      )}
    </div>
  );
};

export default ProfileCard;
