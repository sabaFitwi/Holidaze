import React, { useState, useEffect } from "react";
import BookingsCards from "../../Cards/MyBookings";
import VenuesCards from "../../Cards/MyVenues";
import { updateAuthStatus } from "../../utils/authUtils";

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("My Booking");
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    updateAuthStatus(setIsVenueManager);
  }, []);

  const changeTab = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div>
      <div className="flex justify-center max-w-full space-x-5 sticky top-24 z-10 py-10 bg-gray-50">
        <h3
          className={`${
            activeTab === "My Booking"
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-700"
          } p-2 px-4 my-4
           rounded-t-lg`}
          onClick={() => changeTab("My Booking")}
        >
          Your Bookings
        </h3>
        {isVenueManager && (
          <h3
            className={`${
              activeTab === "My Venue"
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700"
            } p-2 px-4 my-4 rounded-t-lg`}
            onClick={() => changeTab("My Venue")}
          >
            Your Venues
          </h3>
        )}
      </div>

      <div className="bg-white p-4 rounded-b-lg -z-0">
        {activeTab === "My Booking" && <BookingsCards />}
        {activeTab === "My Venue" && <VenuesCards />}
      </div>
    </div>
  );
};

export default Tabs;
