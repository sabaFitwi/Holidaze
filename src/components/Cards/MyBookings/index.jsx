import React, { useState, useEffect } from "react";
import BookingCard from "../../Card/BookingCard";
import { getProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import useDeleteApi from "../../../hooks/useDelete";
import ConfirmationModal from "../../DeleteModal/DeleteConfirm";
import { bookingUrl } from "../../../api";

function BookingsCards() {
  const [myBookingsData, setMyBookingsData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showActiveBookings, setShowActiveBookings] = useState(true);

  const navigate = useNavigate();
  const { isLoading, deleteCard: deleteBooking } = useDeleteApi();

  const handleEditClick = (id) => {
    const updateRoute = `/updatebooking/${id}`;
    navigate(updateRoute);
    console.log(`Edit button clicked for booking ID: ${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setShowSuccess(false);
  };

  const handleBookingDelete = async (id) => {
    try {
      await deleteBooking(bookingUrl + "/" + id);
      setMyBookingsData((prevData) =>
        prevData.filter((booking) => booking.id !== id),
      );
      setIsModalOpen(false);
      setSelectedBooking(null);
      setShowSuccess(true);
      navigate("/profile");

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError(error);
    }
  };

  useEffect(() => {
    getProfile()
      .then((data) => {
        const sortedBookings = data.bookings.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMyBookingsData(sortedBookings);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError(error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentDate = new Date();

  const activeBookings = myBookingsData.filter(
    (booking) =>
      new Date(booking.dateTo) >= currentDate &&
      booking.venue.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const expiredBookings = myBookingsData.filter(
    (booking) => new Date(booking.dateTo) < currentDate,
  );

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div className="flex justify-between m-4">
        <button
          onClick={() => setShowActiveBookings(true)}
          className={`px-2 text py-2 ${
            showActiveBookings ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Active Bookings
        </button>
        <button
          onClick={() => setShowActiveBookings(false)}
          className={`px-2 text py-2 ${
            !showActiveBookings ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Expired Bookings
        </button>
      </div>

      <input
        type="text"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full align-center text p-2 border-2 mb-4 text"
      />

      <div className="mx-auto grid w-full">
        {showActiveBookings &&
          activeBookings.map((booking) => (
            <div key={booking.id}>
              <BookingCard
                id={booking.id}
                media={booking.venue.media[0]}
                title={booking.venue.name}
                price={booking.venue.price}
                dateFrom={formatDate(booking.dateFrom)}
                dateTo={formatDate(booking.dateTo)}
                guests={booking.guests}
                country={booking.venue.location.country}
                continent={booking.venue.location.continent}
                city={booking.venue.location.city}
                onEditClick={() => handleEditClick(booking.id)}
                updated={booking.venue.updated}
                onDeleteClick={() => {
                  setSelectedBooking(booking.id);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}

        {!showActiveBookings &&
          expiredBookings.map((booking) => (
            <div key={booking.id}>
              <BookingCard
                id={booking.id}
                media={booking.venue.media[0]}
                title={booking.venue.name}
                price={booking.venue.price}
                dateFrom={formatDate(booking.dateFrom)}
                dateTo={formatDate(booking.dateTo)}
                guests={booking.guests}
                updated={booking.updated}
                country={booking.venue.location.country}
                continent={booking.venue.location.continent}
                city={booking.venue.location.city}
                onEditClick={() => handleEditClick(booking.id)}
                onDeleteClick={() => {
                  setSelectedBooking(booking.id);
                  setIsModalOpen(true);
                }}
                isExpired={true}
              />
            </div>
          ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleBookingDelete(selectedBooking)}
        message="Are you sure you want to delete this item?"
        confirmText="Delete Permanently"
        cancelText="Cancel"
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
