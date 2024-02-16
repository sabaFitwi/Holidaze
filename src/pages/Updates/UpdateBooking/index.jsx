import React, { useState, useEffect } from "react";
import Button from "../../../components/Ui/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ScrollToTopButton from "../../../components/ScrollToTopButton";

import { bookingUrl } from "../../../api";
import usePut from "../../../hooks/usePut";
import useApi from "../../../hooks/useApi";
import { FaArrowLeft } from "react-icons/fa";
import SEO from "../../../components/SEO";

const UpdateBooking = () => {
  const { id } = useParams();
  const { updateItem } = usePut();
  const navigate = useNavigate();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const {
    data,
    isLoading,
    isError: bookingError,
  } = useApi(`${bookingUrl}/${id}`);

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !bookingError && data) {
      console.log(data);
      try {
        const { dateFrom, dateTo } = data;
        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          setDate([{ startDate, endDate, key: "selection" }]);
        } else {
          console.error("Invalid dates received:", dateFrom, dateTo);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [isLoading, bookingError, data]);

  const handleDateChange = (ranges) => {
    const selectedStartDate = new Date(ranges.selection.startDate);
    const today = new Date();

    if (selectedStartDate.toDateString() === today.toDateString()) {
      setError("You cannot book for today. Please select another date.");
      return;
    }

    setError("");
    setDate([ranges.selection]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateItem(`${bookingUrl}/${id}`, {
        dateFrom: date[0].startDate.toISOString(),
        dateTo: date[0].endDate.toISOString(),
      });

      if (!response) {
        throw new Error("Failed to update booking");
      }

      console.log("Success:", response);
      setSuccessMessage("Booking updated successfully");
      setError("");

      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to update booking");
      setSuccessMessage("");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (bookingError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <SEO
        title="Update Booking | Holidaze"
        description="update your Holidaze booking easily."
      />
      <main className="max-w-2xl mx-auto px-4 sm:px-8 bg-white shadow py-4 my-10">
        <div className="flex items-center my-4">
          <Link to="/profile" className="text-primary flex items-center">
            <FaArrowLeft className="mr-2" /> Back to profile
          </Link>
        </div>
        <h1 className="h1 font-bold mb-4">Update Booking</h1>
        <form onSubmit={handleSubmit}>
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
            />
          </div>

          {successMessage && (
            <div className="text-green-600 p-4 ">{successMessage}</div>
          )}
          {error && <div className="text-red-600 p-4">{error}</div>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </form>

        <ScrollToTopButton />
      </main>
    </div>
  );
};

export default UpdateBooking;
