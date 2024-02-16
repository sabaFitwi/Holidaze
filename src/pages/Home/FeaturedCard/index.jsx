import React from "react";
import { useFetchData } from "../../../hooks/useGetData";
import HomeCard from "./HomeCard";
import { getAllVenues } from "../../../api";

const FeaturedCards = () => {
  const { data: rooms, isLoading, isError } = useFetchData(getAllVenues);

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
  const filteredRooms = rooms.filter((room) => {
    const isEurope = room.location && room.location.continent === "Europe";
    const isNorway = room.location && room.location.country === "Norway";

    // const isMetaValid =
    // room.meta && Object.values(room.meta).every((value) => value === true);

    const hasRating = room.rating >= 2;

    return isEurope && isNorway && hasRating;
  });

  return (
    <div>
      <div className="flex space-x-6 overflow-scroll scrollbar-hide">
        {filteredRooms.map((room) => (
          <div key={room.id}>
            <HomeCard
              id={room.id}
              imageUrl={room.media}
              title={room.name}
              price={room.price}
              wifi={room.meta.wifi}
              breakfast={room.meta.breakfast}
              pets={room.meta.pets}
              parking={room.meta.parking}
              city={room.location.city}
              country={room.location.country}
              continent={room.location.continent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards;
