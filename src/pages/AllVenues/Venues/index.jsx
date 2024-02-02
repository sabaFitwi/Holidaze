// VenueList.js
import React from "react";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import noImage from "../../../assets/noPic.jpg";

function Venues({ sortedVenues }) {
  return (
    <div className="mx-auto grid w-full">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {sortedVenues.map((venue) => (
          <div key={venue.id}>
            <Link to={`/venue/${venue.id}`}>
              <div className="flex flex-col xl:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease">
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
                      <BsMap className="m-2" />
                      {venue.location.country}
                    </div>
                    <p className="px-5 mr-2 text-xl font-semibold">
                      {venue.price}
                      <span className="text-sm font-light">/night</span>
                    </p>
                  </div>
                  <h4 className="text-gray-900 font-bold text-lg mb-2">
                    {venue.name}
                  </h4>
                  <div className="flex items-center pb-4">
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={venue.owner?.avatar}
                      alt="Avatar of Writer"
                    />
                    <div className="text-sm ">
                      <p className="text-gray-900 leading-none">
                        {venue.owner?.name}
                      </p>
                      <p className="text-gray-600">Aug 18</p>
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
