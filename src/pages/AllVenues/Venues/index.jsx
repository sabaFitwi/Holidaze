import React from "react";
import { Link } from "react-router-dom";
import { BsSignNoParking, BsWifi } from "react-icons/bs";
import {
  LuMapPin,
  LuMapPinOff,
  LuParkingCircle,
  LuWifiOff,
} from "react-icons/lu";
import { FaPaw, FaUsers } from "react-icons/fa";
import { TbCoffee, TbCoffeeOff } from "react-icons/tb";

import noImage from "../../../assets/noPic.jpg";
import StarRating from "../../../components/RatingStars";

function Venues({ sortedVenues }) {
  return (
    <div className="mx-auto grid w-ful ">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
        {sortedVenues.map((venue) => (
          <div key={venue.id}>
            <Link to={`/venue/${venue.id}`}>
              <div className="flex flex-col xl:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease pb-4">
                <div className="relative w-full h-40 xl:w-60 flex-shrink-0">
                  {venue.media && venue.media[0] ? (
                    <img
                      src={venue.media[0]}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={noImage}
                      alt="ImagePreview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-grow pl-4 pt-2">
                  <div className="flex justify-between">
                    <div className="text-xs flex items-center mb-1">
                      {venue.location.country &&
                      venue.location.country.toLowerCase() !== "unknown" ? (
                        <>
                          <LuMapPin className="m-2 text-red-600" />
                          {venue.location.country}
                        </>
                      ) : (
                        <>
                          <LuMapPinOff className="m-2 text-gray-400" />
                          Unknown
                        </>
                      )}
                    </div>
                    <h2 className=" h2 px-5 mr-2  font-semibold">
                      {venue.price}
                      <span className="text-sm font-light">/night</span>
                    </h2>
                  </div>
                  <h3 className="h3 text-gray-900 font-bold">{venue.name}</h3>
                  <div className="flex items-center pb-2">
                    <StarRating rating={venue.rating} />
                    <span className="ml-1 text-xs">({venue.rating})</span>
                  </div>
                  <div className="my-4">
                    <div className="flex text-xs  items-center pb-2">
                      <FaUsers className="text-gray-500 mr-2" />
                      <span className="text-gray-700">
                        {venue.maxGuests} Guests
                      </span>
                    </div>
                    <div className="flex items-center">
                      {venue.meta.wifi ? (
                        <BsWifi className="text-primary mr-3" />
                      ) : (
                        <LuWifiOff className="text-gray-400 mr-3" />
                      )}
                      {venue.meta.parking ? (
                        <LuParkingCircle className="text-primary mr-3" />
                      ) : (
                        <BsSignNoParking className="text-gray-400 mr-3" />
                      )}
                      {venue.meta.breakfast ? (
                        <TbCoffee className="text-primary mr-3" />
                      ) : (
                        <TbCoffeeOff className="text-gray-400 mr-3" />
                      )}
                      {venue.meta.pets ? (
                        <FaPaw className="text-primary mr-3" />
                      ) : (
                        <FaPaw className="text-gray-400 mr-3" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {sortedVenues.length === 0 && <p>No venues found.</p>}
      </div>
    </div>
  );
}

export default Venues;
