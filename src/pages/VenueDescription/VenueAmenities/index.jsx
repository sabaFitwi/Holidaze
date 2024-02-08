import React from "react";
import { BsSignNoParking, BsWifi } from "react-icons/bs";
import { LuParkingCircle, LuWifiOff } from "react-icons/lu";
import { FaPaw } from "react-icons/fa";
import { TbCoffee, TbCoffeeOff } from "react-icons/tb";

function VenueAmenities({ data }) {
  if (!data || !data.meta) {
    return null; // Handle case where data or data.meta is not available
  }

  const { wifi, parking, breakfast, pet } = data.meta;

  return (
    <div className="m-4">
      <h2 className="block font-bold ">This Venue includes</h2>
      <div className="flex  flex-wrap">
        <div className="flex text-sm items-center">
          {wifi ? (
            <>
              <BsWifi className="text-primary  m-3" />
              <span className="text-gray-800 ">Wifi</span>
            </>
          ) : (
            <>
              <LuWifiOff className="text-gray-400 line-through m-3" />
              <span className="text-gray-400 line-through">Wifi</span>
            </>
          )}
        </div>
        <div className="flex text-sm items-center">
          {parking ? (
            <>
              <LuParkingCircle className="text-primary m-3" />
              <span className="text-gray-800">Parking</span>
            </>
          ) : (
            <>
              <BsSignNoParking className="text-gray-400  line-through m-3" />
              <span className="text-gray-400 line-through ">Parking</span>
            </>
          )}
        </div>
        <div className="flex text-sm items-center">
          {breakfast ? (
            <>
              <TbCoffee className="text-primary m-3" />
              <span className="text-gray-800">Breakfast</span>
            </>
          ) : (
            <>
              <TbCoffeeOff className="text-gray-400 line-through m-3" />
              <span className="text-gray-400 line-through">Breakfast</span>
            </>
          )}
        </div>
        <div className="flex text-sm items-center">
          {pet ? (
            <>
              <FaPaw className="text-primary m-3" />
              <span className="text-gray-800">Pets</span>
            </>
          ) : (
            <>
              <FaPaw className="text-gray-400 line-through m-3" />
              <span className="text-gray-400 line-through">Pets</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VenueAmenities;
