import React, { useState, useEffect } from "react";
import VenueCard from "../../Card/VenueCard";
import { getProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import useDeleteApi from "../../../hooks/useDelete";
import ConfirmationModal from "../../DeleteModal/DeleteConfirm";

function VenuesCards() {
  const [hostingData, setHostingData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();
  const { loading, error, deleteCard: deleteVenue } = useDeleteApi("booking");

  const handleEditClick = (venueId) => {
    const updateRoute = `/update/${venueId}`;
    navigate(updateRoute);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setShowSuccess(false);
  };

  const handleVenueDelete = async (venueId) => {
    try {
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
      .then((data) => {
        const sortedHosting = data.venues.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setHostingData(sortedHosting);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  const filteredHostings = hostingData.filter((hosting) =>
    hosting.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!hostingData) {
    return <div>{loading}</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(hostingData);
  return (
    <div>
      <div className="mx-auto grid  w-full ">
        <input
          type="text"
          placeholder="Search your Venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" w-full align-center p-2 border-2 text mb-4"
        />
        {filteredHostings.reverse().map((hosting) => (
          <div key={hosting.id}>
            <VenueCard
              id={hosting.id}
              media={hosting.media[0]}
              title={hosting.name}
              price={hosting.price}
              wifi={hosting.meta.wifi}
              parking={hosting.meta.parking}
              breakfast={hosting.meta.breakfast}
              pets={hosting.meta.pets}
              country={hosting.location.country}
              continent={hosting.location.continent}
              city={hosting.location.city}
              maxGuests={hosting.maxGuests}
              rating={hosting.rating}
              updated={hosting.updated}
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
