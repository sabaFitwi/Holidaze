import React, { useState } from "react";
import Button from "../../components/Ui/Button";
import Input from "../../components/Ui/Input";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import SEO from "../../components/SEO";
import { useNavigate } from "react-router-dom";
import { createVenueUrl } from "../../api";
import Headers from "../../hooks/useHeader";

const CreateVenueForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: "",
    price: 0,
    maxGuests: 1,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
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
    "Europe",
    "Africa",
    "North America",
    "South America",
    "Antarctica",
    "Australia",
  ];

  const [images, setImages] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, ""]);
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
      // Handle other regular fields
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(createVenueUrl, {
        method: "POST",
        headers: Headers("application/json"),
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);

      setSuccessMessage(true);
      setError("");

      setTimeout(() => {
        navigate("/profile");
        setSuccessMessage(false);
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating venue. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <SEO
        title="Create Venue | Holidaze"
        description="Create a great place and let everyone know about it! Join us and share your creation with the world!"
      />
      <main className="max-w-2xl mx-auto  dark:bg-darkSecondary dark:text-white shadow p-4 my-8">
        <h1 className="h1 font-bold uppercase mb-4">Create Venue</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title:</label>
            <Input
              data-cy="venueName"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2  w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description:</label>
            <Input
              data-cy="venueDescription"
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
            {images.map((imageUrl, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium ">
                  Image {index + 1}
                </label>

                <div className="flex flex-col items-center space-x-2 w-full">
                  <div className="flex justify-between w-full">
                    <Input
                      data-cy="media"
                      id="media"
                      name="media"
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:border-primary"
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
                  id="add-image-button"
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
            <label htmlFor="price" className="block text-sm font-medium">
              Price:
            </label>
            <Input
              data-cy="price"
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
            <label htmlFor="maxGuests" className="block text-sm font-medium">
              Max Guests:
            </label>
            <Input
              data-cy="maxGuests"
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
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating:
            </label>
            <Input
              data-cy="rating"
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
            <label className="block text-sm font-medium text-gray-600  dark:text-white">
              Amenities:
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
                    formData.meta.wifi ? "bgOn" : "bgOff "
                  }`}
                >
                  <span
                    className={`switch-slider ${
                      formData.meta.wifi ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </label>
                <div className="ml-2 text-gray-700  dark:text-white">WiFi</div>
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
                    formData.meta.parking ? "bgOn" : "bgOff"
                  }`}
                >
                  <span
                    className={`switch-slider ${
                      formData.meta.parking ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </label>
                <div className="ml-2 text-gray-700  dark:text-white">
                  Parking
                </div>
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
                    formData.meta.breakfast ? "bgOn" : "bgOff"
                  }`}
                >
                  <span
                    className={`switch-slider ${
                      formData.meta.breakfast
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  ></span>
                </label>
                <div className="ml-2 text-gray-700  dark:text-white">
                  Breakfast
                </div>
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
                    formData.meta.pets ? "bgOn" : "bgOff"
                  }`}
                >
                  <span
                    className={`switch-slider ${
                      formData.meta.pets ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </label>
                <div className="ml-2 text-gray-700  dark:text-white">Pets</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Address:
            </label>
            <Input
              data-cy="address"
              type="text"
              id="address"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium">
              City:
            </label>
            <Input
              data-cy="city"
              type="text"
              id="city"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="zip" className="block text-sm font-medium">
              ZIP:
            </label>
            <Input
              data-cy="zip"
              type="text"
              id="zip"
              name="location.zip"
              value={formData.location.zip}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium">
              Country:
            </label>
            <Input
              data-cy="country"
              type="text"
              id="country"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="continent" className="block text-sm font-medium">
              Continent:
            </label>
            <select
              id="continent"
              name="location.continent"
              value={formData.location.continent}
              onChange={handleChange}
              className="mt-1 p-2 border dark:bg-darkPrimary rounded w-full"
            >
              {continentOptions.map((continent) => (
                <option
                  key={continent}
                  value={continent}
                  className=" dark:bg-darkPrimary"
                >
                  {continent}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="lat" className="block text-sm font-medium">
              Latitude:
            </label>
            <Input
              data-cy="lat"
              type="number"
              id="lat"
              name="location.lat"
              value={formData.location.lat}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lng" className="block text-sm font-medium">
              Longitude:
            </label>
            <Input
              data-cy="lng"
              type="number"
              id="lng"
              name="location.lng"
              value={formData.location.lng}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {error && <div className="text-red-600 p-4">{error}</div>}

          <Button
            data-cy="submitVenue"
            id="submit-button"
            className="button"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
        {successMessage && (
          <div className="fixed w-full mx-auto inset-0 flex items-center justify-center">
            <div className="bg-black opacity-80  dark:opacity-100 p-6 rounded-md max-w-md w-full shadow-md">
              <p className=" text-green-400 text-center  mb-4">
                Venue created successfully! You can see the created venue in
                your profile.
              </p>
            </div>
          </div>
        )}
        <ScrollToTopButton />
      </main>
    </div>
  );
};

export default CreateVenueForm;
