import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useGetData";
import Filter from "../AllVenues/Filter";
import Modal from "react-modal";
//import DateInput from "../../components/ui/DateInput";
import CostContext from "../../context/CostContext";
import Input from "../../components/Ui/Input";

Modal.setAppElement("#root");

function VenueDescription() {
  const { id } = useParams();
  const [image, setImage] = useState(0);
  //const [checkInDate, setCheckInDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const updateTotalCost = (cost) => {
    setTotalCost(cost);
  };

  const { data, error, loading } = useFetchData(
    `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
  );

  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  const { media, name, price, description, wifi, breakfast, parking, pet } =
    data;

  const openImageFullscreen = (index) => {
    setImage(index);
    setIsImageFullscreen(true);
  };

  const closeImageFullscreen = () => {
    setIsImageFullscreen(false);
  };

  return (
    <CostContext.Provider value={{ onUpdateTotalCost: updateTotalCost }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              {media.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center ${
                    index === image ? "block" : "hidden"
                  }`}
                  onClick={() => openImageFullscreen(index)}
                >
                  <img
                    src={imageUrl}
                    alt={name}
                    className={`object-cover h-full w-full cursor-pointer`}
                  />
                </div>
              ))}
            </div>

            <div className="flex -mx-2 mt-14 mb-4">
              {media.map((imageUrl, index) => (
                <div key={index} className="flex px-2">
                  <div
                    onClick={() => setImage(index)}
                    className={`focus:outline-none rounded-lg w-16 h-16 md:w-24 md:h-24 bg-gray-100 flex items-center justify-start ${
                      image === index ? "ring-2 ring-indigo-300 ring-inset" : ""
                    }`}
                  >
                    <img src={imageUrl} alt={name} className="object-cover " />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:flex-1 px-4">
            <h1 className=" h1 mb-2 leading-tight tracking-tight font-bold text-gray-800 ">
              {name}
            </h1>
            {/* <p className="text-gray-500 text-sm">
              By
              <a href="#" className="text-indigo-600 hover:underline">
                ABC Company
              </a>
            </p> */}
            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p p className="text-green-500 text-xl font-semibold">
                  Save 12%
                </p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>
            <p className="text-gray-500">{description}</p>
            <Filter
              venueId={id}
              isUpdateMode={true}
              onUpdateTotalCost={updateTotalCost}
              price={price}
              data={data}
            />
            <div className="mb-4">
              <label className="block text-gray-600">Amenities:</label>
              <div className="flex flex-col items-start">
                <label className="flex items-center">
                  <Input type="checkbox" checked={wifi} className="mr-2" />
                  Wi-Fi
                </label>
                <label className="flex items-center">
                  <Input type="checkbox" checked={pet} className="mr-2" />
                  Pets
                </label>
                <label className="flex items-center">
                  <Input
                    type="checkbox"
                    checked={breakfast}
                    className="mr-2 "
                  />
                  Breakfast
                </label>
                <label className="flex items-center">
                  <Input type="checkbox" checked={parking} className="mr-2" />
                  Parking
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {price}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                {/* Display the total cost */}
                <p className="text-green-500 text-xl font-semibold">{`Total Cost: $${totalCost}`}</p>
                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isImageFullscreen}
          onRequestClose={closeImageFullscreen}
          contentLabel="Image Modal"
          overlayClassName="fixed top-0 left-0 w-full h-full bg-black opacity-95"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          shouldCloseOnOverlayClick={true}
        >
          <img
            src={media[image]}
            alt={name}
            className="object-contain mt-14 max-h-screen"
          />
        </Modal>
      </div>
    </CostContext.Provider>
  );
}

export default VenueDescription;
