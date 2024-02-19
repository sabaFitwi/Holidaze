import React, { useState, useEffect } from "react";
import Headers from "../../../hooks/useHeader";
import { FaUser } from "react-icons/fa";
import useAvatar from "../../../hooks/useAvatar";
import { profileUrl } from "../../../api";
import ConfirmModal from "../../../components/Ui/Modal";

const ProfileCard = () => {
  const { profileData, updateAvatar } = useAvatar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {}, [profileData]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAvatarError("");
  };

  const handleAvatarUpdate = () => {
    if (!avatarError) {
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

  const handleAvatarChange = (event) => {
    const url = event.target.value;
    setNewAvatar(url);
    validateUrl(url);
  };

  const validateUrl = (url) => {
    const pattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/i;

    if (!url.trim()) {
      setAvatarError("Please enter an avatar URL.");
    } else if (!pattern.test(url)) {
      setAvatarError("Please enter a valid URL.");
    } else {
      setAvatarError("");
    }
  };

  return (
    <div className="flex justify-around items-center bg-white lg:items-start lg:min-h-screen p-4  dark:bg-darkPrimary  dark:text-white ">
      {profileData && (
        <div className="flex flex-col  sm:flex-row lg:flex-col justify-center  dark:bg-black sm:max-w-1/3 p-6 shadow-lg sticky top-40 rounded-xl sm:px-12">
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
              <h2 className="font-semibold text capitalize">
                {profileData.name}
              </h2>
              <p className="px-5 text">
                {profileData.venueManager
                  ? "You are a Venue Manager"
                  : "You are a Customer"}
              </p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 divide-x divide-gray-700 align-center">
              <button className="whitespace-nowrap text">
                {profileData.email}
              </button>
              <button
                className="whitespace-nowrap text pl-3 hover:text-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleAvatarUpdate}
        message="Are you sure you want to save changes?"
        confirmText="Save Changes"
        cancelText="Cancel"
        showInput={true}
        inputPlaceholder="Enter avatar URL"
        inputValue={newAvatar}
        onInputChange={handleAvatarChange}
      />
    </div>
  );
};

export default ProfileCard;
