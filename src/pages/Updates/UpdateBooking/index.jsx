import React, { useState, useEffect } from "react";
import Button from "../../../components/Ui/Button";
import Input from "../../../components/Ui/Input";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the styles for react-date-range
import "react-date-range/dist/theme/default.css";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import useApi from "../../../hooks/useApi";
import { bookingUrl } from "../../../api";
import usePut from "../../../hooks/usePut";

const UpdateBooking = () => {
  const { id } = useParams();
  const { updateItem, isUpdating, isError, errorMessage } = usePut();
  const navigate = useNavigate();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isLoading && !bookingError && data) {
      try {
        const { dateFrom, dateTo, guests } = data;
        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          setDate([{ startDate, endDate, key: "selection" }]);
          setGuests(guests);
        } else {
          console.error("Invalid dates received:", dateFrom, dateTo);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [isLoading, bookingError, data]);

  const handleDateChange = (ranges) => {
    setDate([ranges.selection]);
  };

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateItem(`${bookingUrl}/${id}`, null, {
        dateFrom: date[0].startDate.toISOString(),
        dateTo: date[0].endDate.toISOString(),
        guests: guests,
      });

      if (!response) {
        throw new Error("Failed to update booking");
      }

      console.log("Success:", response);
      setIsLoading(false);
      setShowModal(true); // Set showModal state to true to display the modal
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setBookingError(true);
    }
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleCloseModal = () => {
    setShowModal(false); // Set showModal state to false to close the modal
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 bg-white shadow py-4 my-8">
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

        <Button type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="mb-4">Booking updated successfully!</p>
            <div className="flex justify-end">
              <Button onClick={handleGoToProfile}>Go to Profile</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
};

export default UpdateBooking;
