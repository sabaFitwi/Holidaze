import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MyVenueBooking() {
  const [bookingsLength, setBookingsLength] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    // Fetch bookings data for the specific venue directly from the API
    fetch(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`,
    )
      .then((response) => response.json())
      .then((venueData) => {
        // Count the bookings for the specific venue directly from the API response
        const bookingsCount = venueData.bookings.length;

        // Set the bookings length to state
        setBookingsLength(bookingsCount);
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
      });
  }, [id]); // Include id in the dependency array to re-run the effect when id changes

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
      <p>Number of Bookings: {bookingsLength}</p>
    </div>
  );
}

export default MyVenueBooking;
