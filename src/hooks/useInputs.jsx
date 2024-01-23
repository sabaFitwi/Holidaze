// import { useState } from "react";
// import Headers from "../hooks/useHeader";

// const useInput = ({ media }) => {
//   const [formData, setFormData] = useState({
//     media,
//   });

//   const handleImageInputChange = (e) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       images: value.split(",").map((url) => url.trim()),
//     });
//   };

//   const handleAddImage = () => {
//     setFormData({
//       ...formData,
//       images: [...formData.images, ""],
//     });
//   };

//   const handleImageChange = (index, value) => {
//     const updatedImages = [...formData.images];
//     updatedImages[index] = value;

//     setFormData({
//       ...formData,
//       images: updatedImages,
//     });
//   };

//   const handleDeleteImage = (index) => {
//     if (formData.images.length === 1) {
//       return;
//     }

//     const updatedImages = [...formData.images];
//     updatedImages.splice(index, 1);

//     setFormData({
//       ...formData,
//       images: updatedImages,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = {
//       name: formData.name,
//       description: formData.description,
//       media: [...formData.media],
//       price: formData.price,
//       maxGuests: formData.maxGuests,
//       wifi: formData.wifi,
//       parking: formData.parking,
//       breakfast: formData.breakfast,
//       pets: formData.pets,
//       address: formData.address,
//       city: formData.city,
//       zip: formData.zip,
//       country: formData.country,
//       continent: formData.continent,
//       lat: formData.lat,
//       lng: formData.lng,
//       // Add more fields as needed
//     };

//     const Url = "https://api.noroff.dev/api/v1/holidaze/venues";
//     //const token = localStorage.getItem("ApiToken");

//     try {
//       const response = await fetch(Url, {
//         headers: Headers("application/json"),

//         method: "POST",
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form");
//       }

//       const data = await response.json();
//       console.log("Data", data);

//       // Handle successful response from API
//       // Redirect or show success message
//       //navigate(`/venue/${data.id}`);
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };

//   return {
//     formData,
//     handleImageInputChange,
//     handleAddImage,
//     handleImageChange,
//     handleDeleteImage,

//     handleSubmit,
//   };
// };

// export default useInput;
