import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateAuthStatus } from "../../utils/authUtils";
import { BsSignNoParking, BsWifi } from "react-icons/bs";
import { LuParkingCircle, LuWifiOff } from "react-icons/lu";
import { FaBook, FaEdit, FaPaw, FaTrash } from "react-icons/fa";
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
    <div className=" text flex flex-col sm:flex-row border dark:border-0  dark:bg-darkSecondary dark:text-white cursor-pointer hover:opacity-90 hover:shadow-xl transition duration-200 ease-out ease my-2">
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
              <div className="absolute right-0 mt-2 py-2 border rounded shadow-lg bg-white  dark:bg-black  ">
                {isVenueManager && (
                  <div className="flex justify-start items-center px-2  hover:bg-gray-500">
                    <FaBook />
                    <Link
                      to={`/venueBookings/${id}`}
                      className="block text-sm px-4 whitespace-nowrap py-2 "
                    >
                      Venue Bookings
                    </Link>
                  </div>
                )}
                <div className="flex justify-start items-center hover:bg-gray-500 px-2">
                  <FaEdit />
                  <button
                    onClick={onEditClick}
                    className="block px-4 py-2 text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex justify-start items-center  hover:bg-gray-500 px-2">
                  <FaTrash className="text-red-500" />
                  <button
                    onClick={onDeleteClick}
                    className="block px-4 py-2 text-sm text-red-700"
                  >
                    Delete
                  </button>
                </div>
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
          <span className=" ml-1 font-normal">Max {maxGuests} Guests</span>
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
          <span className=" ml-1 font-normal">
            {continent}, {country}, {city}
          </span>
        </p>
        <p className=" font-semibold ">
          Created:
          <span className=" ml-1 font-normal">
            {daysSincePosted(updated)} ago
          </span>
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default VenueCard;
