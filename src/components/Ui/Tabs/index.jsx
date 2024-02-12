import React, { useState, useEffect } from "react";
import BookingsCards from "../../Cards/MyBookings";
import VenuesCards from "../../Cards/MyVenues";
import { updateAuthStatus } from "../../utils/authUtils";

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("My Booking");
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [position, setPosition] = useState("");

  useEffect(() => {
    updateAuthStatus(setIsVenueManager);
  }, []);

  const changeTab = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);

    setPosition(tab === "My Booking" ? "translateX(0)" : "translateX(100%)");
  };

  return (
    <div>
      <div className="flex justify-center max-w-full space-x-5 pt-1">
        <h3
          className={`${
            activeTab === "My Booking"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400"
          } p-2 text  my-1 rounded-t-lg cursor-pointer`}
          onClick={() => changeTab("My Booking")}
        >
          Your Bookings
        </h3>
        {isVenueManager && (
          <h3
            className={`${
              activeTab === "My Venue"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-400"
            } p-2 text  my-1 rounded-t-lg cursor-pointer`}
            onClick={() => changeTab("My Venue")}
          >
            Your Venues
          </h3>
        )}
      </div>

      <div className="bg-white p-0 md:p-4 rounded-b-lg relative overflow-hidden">
        <div
          className="absolute bg-black h-1 w-1/2 transition-transform duration-300"
          style={{ transform: position }}
        />
        {activeTab === "My Booking" && <BookingsCards />}
        {activeTab === "My Venue" && <VenuesCards />}
      </div>
    </div>
  );
};

export default Tabs;
