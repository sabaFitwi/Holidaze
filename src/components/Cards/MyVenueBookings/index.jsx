import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { createVenueUrl } from "../../../api";
import SEO from "../../SEO";

function MyVenueBooking() {
  const [venueData, setVenueData] = useState(null);
  const [activeBookings, setActiveBookings] = useState([]);
  const [expiredBookings, setExpiredBookings] = useState([]);
  const [showActiveBookings, setShowActiveBookings] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${createVenueUrl}/${id}?_bookings=true&_owner=true`)
      .then((response) => response.json())
      .then((data) => {
        setVenueData(data);
        setActiveBookings(
          data.bookings.filter(
            (booking) => new Date(booking.dateTo) > new Date(),
          ),
        );
        setExpiredBookings(
          data.bookings.filter(
            (booking) => new Date(booking.dateTo) <= new Date(),
          ),
        );
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className=" dark:text-white">
      <SEO
        title="venue Bookings | Holidaze"
        description="see your  venues booking Holidaze ."
      />
      <div className="container  dark:bg-darkSecondary mx-auto my-8 text ">
        <div className="flex items-center mb-4">
          <Link
            to="/profile"
            className="text-primary dark:text-primary-hover flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Profile
          </Link>
        </div>
        <h1 className="h1 font-bold m-4">Your Venue Booking Information</h1>
        {venueData && (
          <div className="flex flex-col rounded-2xl w-full cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out">
            <div className="relative w-full h-60">
              <img
                src={venueData.media[0]}
                alt={venueData.name}
                className="w-full h-full object-cover py-2"
              />
            </div>

            <div className="w-full flex flex-col p-2 px-4">
              <p className="font-semibold pb-2 text">
                Number of Venue Bookings:
                <span className="ml-1 font-normal">
                  ({venueData.bookings.length})
                </span>
              </p>
              <p className="font-semibold mb-2 text">
                Title:{" "}
                <span className="ml-1 font-normal">{venueData.name}</span>
              </p>

              <p className="font-semibold pb-2 text">
                Price:
                <span className="ml-1 font-normal">
                  {venueData.price} kr/night
                </span>
              </p>
            </div>
          </div>
        )}
        {venueData ? (
          <div>
            <div className="flex justify-between m-4">
              <button
                onClick={() => setShowActiveBookings(true)}
                className={`px-4 py-2 ${
                  showActiveBookings
                    ? "bg-primary text-white"
                    : "bg-gray-300 text"
                }`}
              >
                Upcoming Booking
                {activeBookings.length > 0 && `(${activeBookings.length})`}
              </button>
              <button
                onClick={() => setShowActiveBookings(false)}
                className={`px-4 py-2 ${
                  !showActiveBookings
                    ? "bg-primary text-white"
                    : "bg-gray-300 dark:text-gray-500 text"
                }`}
              >
                Past Venue Booking{""}
                {expiredBookings.length > 0 && `(${expiredBookings.length})`}
              </button>
            </div>
            {showActiveBookings ? (
              <table className="table-auto ">
                <thead>
                  <tr>
                    <th className="px-4 py-2 whitespace-nowrap text">From</th>
                    <th className="px-4 py-2 whitespace-nowrap text">To</th>
                    <th className="px-4 py-2 whitespace-nowrap text">Guests</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBookings.map((booking) => (
                    <tr key={booking.id} className="booking-details">
                      <td className="border px-4 py-2">
                        {formatDate(booking.dateFrom)}
                      </td>
                      <td className="border px-4 py-2">
                        {formatDate(booking.dateTo)}
                      </td>
                      <td className="border px-4 py-2">{booking.guests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="table-auto ">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date From</th>
                    <th className="px-4 py-2">Date To</th>
                    <th className="px-4 py-2">Guests</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredBookings.map((booking) => (
                    <tr key={booking.id} className="booking-details">
                      <td className="border px-4 py-2 text-red-600">
                        {formatDate(booking.dateFrom)}
                      </td>
                      <td className="border px-4 py-2 text-red-600">
                        {formatDate(booking.dateTo)}
                      </td>
                      <td className="border px-4 py-2 text-red-600">
                        {booking.guests}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <p>Loading venue data...</p>
        )}
      </div>
    </div>
  );
}

export default MyVenueBooking;
