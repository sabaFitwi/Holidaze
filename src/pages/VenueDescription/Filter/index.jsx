import React, { useState, useEffect, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateInput from "../../../components/Ui/DateInput";
import { useNavigate, useParams } from "react-router-dom";
import Headers from "../../../hooks/useHeader";
import CostContext from "../../../context/CostContext";
import Button from "../../../components/Ui/Button";
import Input from "../../../components/Ui/Input";
import { useFetchData } from "../../../hooks/useGetData";
import { createVenueUrl } from "../../../api";

function Filter({ onUpdate, price }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [validationMessage, setValidationMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { onUpdateTotalCost } = useContext(CostContext);
  const url = createVenueUrl;
  const venueUrl = url + `/${id}?_bookings=true&_owner=true`;

  const { data } = useFetchData(venueUrl);

  const existingBookings = data && data.bookings ? data.bookings : [];

  useEffect(() => {
    const totalDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24) + 1,
    );
    const calculatedCost = totalDays * price;

    if (onUpdateTotalCost) {
      onUpdateTotalCost(calculatedCost);
    }
  }, [startDate, endDate, price, onUpdateTotalCost]);

  const handleFiltersSubmit = async () => {
    console.log("Filters submitted");
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    if (!isAuthenticated) {
      setValidationMessage("You are not logged in. Click here to login.");
      return;
    }

    setValidationMessage("");

    if (!startDate || !endDate) {
      console.error("Start date or end date is undefined");
      return;
    }
    if (!id) {
      console.error("Venue ID is missing");
      setValidationMessage("Venue ID is required.");
      return;
    }

    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: guests,
      venueId: id,
    };

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        {
          method: "POST",
          headers: Headers("application/json"),
          body: JSON.stringify(bookingData),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking successful", responseData);
        setSuccessMessage("Booking successful!");
        setTimeout(() => {
          setSuccessMessage("");

          navigate("/profile");
        }, 1000);

        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error("Error during booking", response.statusText);
        setValidationMessage("Error during booking. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking", error.message);
      setValidationMessage("Error during booking. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <DateInput
          label="Check-In"
          value={{ startDate, endDate }}
          onChange={(date) => {
            setStartDate(date.startDate);
            setEndDate(date.endDate);
          }}
          placeholder="Choose a date"
          existingBookings={existingBookings}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="guests" className="text-gray-600">
          Guests
        </label>
        <Input
          type="number"
          id="guests"
          placeholder="Number of guests"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          className="w-20 border"
        />
      </div>
      {validationMessage && (
        <div className="text-red-500 text-sm mt-2">{validationMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 text-sm mt-2">{successMessage}</div>
      )}

      <div className="mt-4 text-center">
        <Button
          type="button"
          onClick={handleFiltersSubmit}
          className={`bg-primary w-full text-gray-100 hover:bg-gray-700 ${
            successMessage ? "cursor-not-allowed" : ""
          }`}
          disabled={successMessage ? true : false}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default Filter;
