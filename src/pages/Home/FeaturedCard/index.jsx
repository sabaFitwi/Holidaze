import React from "react";
import { useFetchData } from "../../../hooks/useGetData";
import HomeCard from "./HomeCard";
import { createVenueUrl, getAllVenues } from "../../../api";

const FeaturedCards = () => {
  const { data: rooms, isLoading, isError } = useFetchData(createVenueUrl);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div>
        <h2>Error fetching data.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  const filterCriteria = {
    price: 100,
    maxGuests: 4,
  };

  // Filter rooms based on the criteria
  const filteredRooms = rooms.filter((room) => {
    return (
      room.price <= filterCriteria.price &&
      room.maxGuests <= filterCriteria.maxGuests
    );
  });

  return (
    <div>
      <div className="flex space-x-6 overflow-scroll scrollbar-hide">
        {rooms?.map((room) => (
          <div key={room.id}>
            <HomeCard
              id={room.id}
              imageUrl={room.media}
              title={room.name}
              description={room.description}
              price={room.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards;
