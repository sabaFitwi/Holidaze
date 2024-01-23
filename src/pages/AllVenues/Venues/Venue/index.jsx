import React from "react";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";

const VenueCard = ({
  id,
  title,
  description,
  media,
  price,
  maxGuests,
  created,
  updated,
  meta,
  bookings,
  owner,
  location,
}) => {
  if (!meta && !owner && !bookings) {
    return null;
  }

  const { wifi, parking, breakfast, pets } = meta;

  // Destructing owner data
  const { name: ownerName, email, avatar } = owner;
  return (
    <Link to={`/venue/${id}`}>
      <div className="flex flex-col xl:flex-row  border  cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out eas ">
        <div className="relative w-full h-40 xl:w-60 flex-shrink-0">
          <img src={media} alt="" className="w-full h-full object-cover" />
        </div>
        <div className=" flex flex-col flex-grow pl-4 pt-2">
          <div className="flex justify-between">
            <div className="text-xs flex items-center mb-1">
              <BsMap className="m-2" />
              Soho, London
            </div>
            <p className="px-5 mr-2 text-xl font-semibold">
              {" "}
              {price}
              <span className="text-sm font-light">/night</span>
            </p>
          </div>

          <h4 className="text-gray-900 font-bold text-lg mb-2">{title}</h4>
          <p className="text-sm pt-3 text-gray-500 flex-grow">{description}</p>

          <div className="flex items-center pb-4">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={avatar}
              alt="Avatar of Writer"
            />
            <div className="text-sm ">
              <p className="text-gray-900 leading-none">name</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
