// import { useState } from "react";

// const useProfileImage = () => {
//   const [profileImage, setProfileImage] = useState(null);

//   const updateProfileImage = async (name, newImage) => {
//     console.log("Updating profile image for:", name);
//     console.log("New image URL:", newImage);

//     try {
//       const apiUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`;

//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           // Add any additional headers as needed for authentication or other purposes
//         },
//         body: JSON.stringify({
//           avatar: newImage,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error updating profile image: ${response.statusText}`);
//       }

//       const updatedProfileData = await response.json();
//       console.log("Updated Profile Data:", updatedProfileData);

//       setProfileImage(updatedProfileData.avatar);
//       console.log(`Profile image updated successfully for ${name}`);
//     } catch (error) {
//       console.error("Error updating profile image:", error);
//     }
//   };

//   return { profileImage, setProfileImage, updateProfileImage };
// };

// export default useProfileImage;
