import React, { useState } from "react";
import ScrollToTopButton from "../../ScrollToTopButton";

function BookingCard({
  title,
  dateFrom,
  dateTo,
  media,
  price,
  guests,
  country,
  continent,
  city,
  onEditClick,
  onDeleteClick,
  isExpired,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex flex-col sm:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease my-2">
      <div className="relative w-full md:w-[40%] h-40 ">
        <img
          src={media}
          alt={title}
          className="w-full h-full object-cover py-2"
        />
      </div>

      <div className="w-full md:w-[60%] flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start">
          <p className="font-semibold text mb-2">
            Title: <span className="ml-1 font-normal text">{title}</span>
          </p>

          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="font-semibold cursor-pointer"
            >
              ...
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 border rounded shadow-lg bg-white z-10">
                <button
                  onClick={onEditClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                >
                  {isExpired ? "ReBook Venue" : "Edit"}
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
        <p
          className={`font-semibold  text pb-2 ${isExpired ? "text-red-500" : ""}`}
        >
          Booked date:
          <span className="ml-1 font-normal">
            {dateFrom} - {dateTo}
          </span>
        </p>
        <p className="font-semibold text pb-2">
          Price: <span className="ml-2 font-normal">{price} kr/night</span>
        </p>
        <p className=" font-semibold text pb-2">
          Guests:
          <span className="text-gray-700 ml-2 font-normal">
            {guests} Guests
          </span>
        </p>
        <p className=" font-semibold  text">
          Location:
          <span className="text-gray-700 ml-2 font-normal">
            {continent}, {country}, {city}
          </span>
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default BookingCard;
