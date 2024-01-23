import React, { useState, useEffect } from "react";
import Headers from "../../../hooks/useHeader";
import { FaUser } from "react-icons/fa";
import Modal from "../../../components/Ui/Modal";
import useAvatar from "../../../hook/useAvatar";

const ProfileCard = () => {
  const { profileData, updateAvatar } = useAvatar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, [profileData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (newImage) => {
    updateAvatar(newImage);
    window.location.reload();

    const updatedUserData = {
      ...profileData,
      avatar: newImage,
    };

    localStorage.setItem("UserData", JSON.stringify(updatedUserData));

    const apiUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${profileData.name}/media`;

    fetch(apiUrl, {
      method: "PUT",
      headers: Headers("application/json"),
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Avatar updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating avatar", error);
      });

    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center lg:items-start lg:min-h-screen p-4 mt-2">
      {profileData && (
        <div className="flex flex-row lg:flex-col justify-center max-w-40 p-6 shadow-lg sticky top-40 rounded-xl sm:px-12">
          {profileData.avatar ? (
            <img
              src={profileData.avatar}
              alt="users avatar"
              className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full"
            />
          ) : (
            <FaUser className="w-20 h-20 md:w-32 md:h-32 mx-auto text-gray-500" />
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

      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && (
        <Modal onClose={handleModalClose} onSave={handleSaveChanges} />
      )}
    </div>
  );
};

export default ProfileCard;
