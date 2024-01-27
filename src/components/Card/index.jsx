import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateAuthStatus } from "../utils/authUtils";

function BookingCard({
  id,
  title,
  dateFrom,
  description,
  media,
  price,
  maxGuests,
  wifi,
  parking,
  breakfast,
  pets,
  address,
  city,
  zip,
  country,
  continent,
  lat,
  lng,
  onEditClick,
  onDeleteClick,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    updateAuthStatus(setIsVenueManager);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className=" card flex borde rounded-2xl pr-5 w-full cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out">
      <Link to={`/venue/${id}`}>
        <div className="relative flex-shrink-0">
          <img
            src={media}
            alt={title}
            className="w-20 h-20 md:w-40 md:h-40 rounded-lg"
          />
        </div>
      </Link>
      <div className=" flex flex-col flex-grow pl-4 pt-2">
        <div className="flex justify-between items-start">
          <p className="px-1 mr-2 text-xs  md:text-md  lg:text-lg font-semibold">
            {price}
            <span className="text-sm md:text-md lg:text-lg font-light">
              /night
            </span>
          </p>

          <div className="relative">
            <div onClick={toggleDropdown} className=" front-semibold px-4 p-2">
              ...
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 bg-white border rounded shadow-lg">
                {isVenueManager && (
                  <Link
                    to={`/venueBookings/${id}`}
                    className=" block whitespace-nowrap text-sm px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Venue Bookings
                  </Link>
                )}
                <button
                  onClick={onEditClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={onDeleteClick}
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <h4 className="text-gray-900 font-semibold text-sm md:text-md  lg:text-lg mb-2">
          {title}
        </h4>

        <div className="hidden md:flex items-center pb-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={media}
            alt="Avatar of Writer"
          />
          <div className="text-sm ">
            <p className="text-gray-900 leading-none">John Smith</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
