import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateAuthStatus } from "../../utils/authUtils";
import { BsSignNoParking, BsWifi } from "react-icons/bs";
import { LuParkingCircle, LuWifiOff } from "react-icons/lu";
import { FaPaw } from "react-icons/fa";
import { TbCoffee, TbCoffeeOff } from "react-icons/tb";

import StarRating from "../../../components/RatingStars";
import { daysSincePosted } from "../../utils/DateSincePost";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function VenueCard({
  id,
  title,
  updated,
  media,
  price,
  maxGuests,
  rating,
  wifi,
  parking,
  breakfast,
  pets,
  city,
  country,
  continent,
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
    <div className=" text flex flex-col sm:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease my-2">
      <div className="relative w-full md:w-[40%] h-60 ">
        <img
          src={media}
          alt={title}
          className="w-full h-full object-cover py-2"
        />
      </div>
      <div className="w-full md:w-[60%] flex flex-col flex-grow p-2 px-4">
        <div className="flex justify-between items-start">
          <p className="font-semibold mb-2">
            Title: <span className="ml-1 font-normal">{title}</span>
          </p>

          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="font-semibold border py-1 cursor-pointer"
            >
              <PiDotsThreeOutlineVerticalFill />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 border rounded shadow-lg bg-white z-10">
                {isVenueManager && (
                  <Link
                    to={`/venueBookings/${id}`}
                    className="block text-sm px-4 whitespace-nowrap py-2 text-gray-700 hover:bg-gray-300"
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

        <p className="font-semibold pb-2">
          Price: <span className="ml-1 font-normal">{price} kr/night</span>
        </p>
        <p className="flex font-semibold items-center mr-1 pb-2">
          Rating: <StarRating rating={rating} />
          <span className="font-normal ml-1">({rating})</span>
        </p>

        <p className=" font-semibold pb-2">
          Guests:
          <span className="text-gray-700 ml-1 font-normal">
            Max {maxGuests} Guests
          </span>
        </p>
        <div className="flex items-center font-semibold pb-2">
          <span className="mr-1"> Included:</span>

          {wifi ? (
            <BsWifi className="text-primary mr-3" />
          ) : (
            <LuWifiOff className="text-gray-400 mr-3 " />
          )}
          {parking ? (
            <LuParkingCircle className="text-primary mr-3" />
          ) : (
            <BsSignNoParking className="text-gray-400 mr-3 " />
          )}
          {breakfast ? (
            <TbCoffee className="text-primary mr-3" />
          ) : (
            <TbCoffeeOff className="text-gray-400 mr-3 " />
          )}
          {pets ? (
            <FaPaw className="text-primary mr-3" />
          ) : (
            <FaPaw className="text-gray-400 mr-3 " />
          )}
        </div>
        <p className=" font-semibold pb-2">
          Location:
          <span className="text-gray-700 ml-1 font-normal">
            {continent}, {country}, {city}
          </span>
        </p>
        <p className=" font-semibold ">
          Created:
          <span className="text-gray-700 ml-1 font-normal">
            {daysSincePosted(updated)} ago
          </span>
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default VenueCard;
