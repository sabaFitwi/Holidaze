import React, { useState, useEffect } from "react";
//import Button from "../../components/Ui/Button";
import Input from "../../../components/Ui/Input";
import { useParams } from "react-router-dom";
import Button from "../../../components/Ui/Button";

const UpdateVenue = () => {
  const { id } = useParams(); // Assuming you have the venue ID in the route params
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [""],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: true,
      parking: true,
      breakfast: true,
      pets: true,
    },
    location: {
      address: "Unknown",
      city: "Unknown",
      zip: "Unknown",
      country: "Unknown",
      continent: "Unknown",
      lat: 0,
      lng: 0,
    },
  });
  const continentOptions = [
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Europe",
    "Australia",
  ];

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const accessToken = localStorage.getItem("Token");
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const venueData = await response.json();
        console.log(venueData);
        const updatedMeta = {
          wifi: venueData.meta.wifi,
          parking: venueData.meta.parking,
          breakfast: venueData.meta.breakfast,
          pets: venueData.meta.pets,
        };

        setFormData((prevData) => ({
          ...prevData,
          ...venueData,
          meta: updatedMeta,
        }));
      } catch (error) {
        console.error("Error:", error);
        // Handle error fetching venue data
      }
    };

    fetchVenueData();
  }, [id]);

  const handleImageChange = (index, value) => {
    const newImages = [...formData.media];
    newImages[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      media: newImages,
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = [...formData.media];
    newImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      media: newImages,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      media: [...prevData.media, ""],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name.startsWith("meta.")) {
      const metaField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [metaField]: checked,
        },
      }));
    } else if (name === "media") {
      setFormData((prevData) => ({
        ...prevData,
        media: value.split(",").map((item) => item.trim()),
      }));
    } else if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]:
            type === "number"
              ? value !== ""
                ? parseFloat(value)
                : null
              : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? parseFloat(value)
              : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("Token");
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      alert("Venue updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating venue. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto shadow p-4 my-8">
      <h1 className=" font-bold mb-4">Update Venue</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title:
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description:
          </label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div>
          {formData.media.map((imageUrl, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image {index + 1}
              </label>

              <div className="flex flex-col items-center space-x-2 w-full">
                <div className="flex justify-between w-full">
                  <Input
                    id="media"
                    name="media"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="Image URL"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="border p-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      X
                    </button>
                  )}
                </div>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    className="mt-4 w-100 h-60 object-cover rounded"
                  />
                )}
              </div>
            </div>
          ))}
          <div className="mb-4">
            <div className="flex flex-col items-center space-x-2">
              <button
                type="button"
                onClick={handleAddImage}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                + Add Image
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price:
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxGuests"
            className="block text-sm font-medium text-gray-600"
          >
            Max Guests:
          </label>
          <Input
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-600"
          >
            Rating:
          </label>
          <Input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            step="0.1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wifi"
                name="meta.wifi"
                checked={formData.meta.wifi}
                onChange={handleChange}
                className="switch-checkbox"
              />
              <label
                htmlFor="wifi"
                className={`switch-label ${
                  formData.meta.wifi
                    ? "switch-label.bg-green-500"
                    : "switch-label.bg-gray-300 "
                }`}
              >
                <span
                  className={`switch-slider ${
                    formData.meta.wifi ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </label>
              <div className="ml-2 text-gray-700">WiFi</div>
            </div>
            <div className="flex items-center">
              <Input
                type="checkbox"
                id="parking"
                name="meta.parking"
                checked={formData.meta.parking}
                onChange={handleChange}
                className="switch-checkbox"
              />
              <label
                htmlFor="parking"
                className={`switch-label ${
                  formData.meta.parking
                    ? "switch-label.bg-green-500"
                    : "switch-label.bg-gray-300 "
                }`}
              >
                <span
                  className={`switch-slider ${
                    formData.meta.parking ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </label>
              <div className="ml-2 text-gray-700">Parking</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="breakfast"
                name="meta.breakfast"
                checked={formData.meta.breakfast}
                onChange={handleChange}
                className="switch-checkbox"
              />
              <label
                htmlFor="breakfast"
                className={`switch-label ${
                  formData.meta.breakfast ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`switch-slider ${
                    formData.meta.breakfast ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </label>
              <div className="ml-2 text-gray-700">Breakfast</div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pets"
                name="meta.pets"
                checked={formData.meta.pets}
                onChange={handleChange}
                className="switch-checkbox"
              />
              <label
                htmlFor="pets"
                className={`switch-label ${
                  formData.meta.pets ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`switch-slider ${
                    formData.meta.pets ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </label>
              <div className="ml-2 text-gray-700">Pets</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Address:
          </label>
          <Input
            type="text"
            id="address"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            City:
          </label>
          <Input
            type="text"
            id="city"
            name="location.city"
            value={formData.location.city}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-600"
          >
            ZIP:
          </label>
          <Input
            type="text"
            id="zip"
            name="location.zip"
            value={formData.location.zip}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-600"
          >
            Country:
          </label>
          <Input
            type="text"
            id="country"
            name="location.country"
            value={formData.location.country}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="continent"
            className="block text-sm font-medium text-gray-600"
          >
            Continent:
          </label>
          <select
            id="continent"
            name="location.continent"
            value={formData.location.continent}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          >
            {continentOptions.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="lat"
            className="block text-sm font-medium text-gray-600"
          >
            Latitude:
          </label>
          <Input
            type="number"
            id="lat"
            name="location.lat"
            value={formData.location.lat}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lng"
            className="block text-sm font-medium text-gray-600"
          >
            Longitude:
          </label>
          <Input
            type="number"
            id="lng"
            name="location.lng"
            value={formData.location.lng}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <Button type="button" onClick={handleSubmit}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateVenue;
