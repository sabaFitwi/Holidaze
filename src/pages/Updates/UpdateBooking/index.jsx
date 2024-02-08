import React, { useState, useEffect } from "react";
import Button from "../../../components/Ui/Button";
import Input from "../../../components/Ui/Input";
import { useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the styles for react-date-range
import "react-date-range/dist/theme/default.css";
import ScrollToTopButton from "../../../components/ScrollToTopButton";

const UpdateBooking = () => {
  const { id } = useParams();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(0);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const accessToken = localStorage.getItem("Token");
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const bookingData = await response.json();
        console.log(bookingData);

        // Convert date strings to the format yyyy-MM-dd
        const formattedStartDate = new Date(bookingData.dateFrom).toISOString();
        const formattedEndDate = new Date(bookingData.dateTo).toISOString();

        setDate([
          {
            startDate: new Date(formattedStartDate),
            endDate: new Date(formattedEndDate),
            key: "selection",
          },
        ]);
        setGuests(bookingData.guests);
      } catch (error) {
        console.error("Error:", error);
        // Handle error fetching booking data
      }
    };

    fetchBookingData();
  }, [id]);

  const handleDateChange = (ranges) => {
    setDate([ranges.selection]);
  };

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value, 10));
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("Token");
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            dateFrom: date[0].startDate.toISOString(),
            dateTo: date[0].endDate.toISOString(),
            guests: guests,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating booking. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto shadow p-4 my-8">
      <h1 className="text-2xl font-bold mb-4">Update Booking</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="dateRange"
            className="block text-sm font-medium text-gray-600"
          >
            Date Range:
          </label>
          <DateRange
            onChange={handleDateChange}
            minDate={new Date()}
            ranges={date}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-600"
          >
            Guests:
          </label>
          <Input
            type="number"
            id="guests"
            name="guests"
            value={guests}
            onChange={handleGuestsChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <Button type="button" onClick={handleSubmit}>
          Update
        </Button>
      </form>
      <ScrollToTopButton />
    </div>
  );
};

export default UpdateBooking;
