import React, { useState, useEffect } from "react";
import BookingCard from "../../Card";
import { getProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import useDeleteApi from "../../../hooks/useDelete";
import ConfirmationModal from "../../DeleteModal/DeleteConfirm";

function BookingsCards() {
  const [MyBookingsData, setMyBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null); // Define error state

  const navigate = useNavigate();
  const { isLoading, deleteCard } = useDeleteApi();

  const handleEditClick = (bookingId) => {
    const updateRoute = `/updatebooking/${bookingId}`;
    navigate(updateRoute);
    console.log(`Edit button clicked for booking ID: ${bookingId}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setShowSuccess(false);
  };

  const handleBookingDelete = async (bookingId) => {
    try {
      await deleteCard(bookingId);
      setMyBookingsData((prevData) =>
        prevData.filter((booking) => booking.id !== bookingId),
      );
      setIsModalOpen(false);
      setSelectedBooking(null);
      setShowSuccess(true);
      navigate("/profile");

      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError(error); // Set error state when an error occurs
    }
  };

  useEffect(() => {
    getProfile()
      .then((data) => setMyBookingsData(data.bookings))
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError(error); // Set error state when an error occurs
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="mx-auto grid w-full">
        {MyBookingsData.map((MyBookings) => (
          <div key={MyBookings.id}>
            <BookingCard
              id={MyBookings.id}
              media={MyBookings.venue.media[0]}
              title={MyBookings.venue.name}
              price={MyBookings.venue.price}
              onEditClick={() => handleEditClick(MyBookings.id)}
              onDeleteClick={() => {
                setSelectedBooking(MyBookings.id);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleBookingDelete(selectedBooking)}
      />
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-200 p-6 rounded-md max-w-md w-full shadow-lg">
            <div className="text-green-600 font-semibold mb-4">
              Item deleted successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsCards;
