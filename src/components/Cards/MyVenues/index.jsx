import React, { useState, useEffect } from "react";
import BookingCard from "../../Card";
import { getProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import useDeleteApi from "../../../hooks/useDelete";
import ConfirmationModal from "../../DeleteModal/DeleteConfirm";

function VenuesCards() {
  const [hostingData, setHostingData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { loading, error, deleteCard: deleteVenue } = useDeleteApi("booking");

  console.log(error);
  const handleEditClick = (venueId) => {
    const updateRoute = `/update/${venueId}`;
    navigate(updateRoute);
    console.log(`Edit button clicked for booking ID: ${venueId}`);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setShowSuccess(false);
  };

  const handleVenueDelete = async (venueId) => {
    try {
      // Call your API or function to delete the venue
      await deleteVenue(venueId);

      setHostingData((prevData) =>
        prevData.filter((booking) => booking.id !== venueId),
      );

      setIsModalOpen(false);
      setSelectedBooking(null);
      setShowSuccess(true);
      navigate("/profile");

      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };
  useEffect(() => {
    getProfile()
      .then((data) => setHostingData(data.venues))

      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!hostingData) {
    return <div>{loading}</div>;
  }
  return (
    <div>
      <div className="mx-auto grid  w-full ">
        {hostingData.map((hosting) => (
          <div key={hosting.id}>
            <BookingCard
              id={hosting.id}
              media={hosting.media[0]}
              title={hosting.name}
              price={hosting.price}
              wifi={hosting.wifi}
              onEditClick={() => handleEditClick(hosting.id)}
              onDeleteClick={() => {
                setSelectedBooking(hosting.id);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleVenueDelete(selectedBooking)}
      />
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-md w-full shadow-md">
            <div className="text-green-600 font-semibold mb-4">
              Item deleted successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VenuesCards;
