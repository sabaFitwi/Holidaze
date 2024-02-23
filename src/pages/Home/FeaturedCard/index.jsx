import React from "react";
import { useFetchData } from "../../../hooks/useGetData";
import HomeCard from "./HomeCard";
import { getAllVenues } from "../../../api";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/ErrorMessage";
import Loader from "../../../components/Loading";

const FeaturedCards = () => {
  const { data: rooms, isLoading, isError } = useFetchData(getAllVenues);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <ErrorMessage />;
  }
  const filteredRooms = rooms.filter((room) => {
    const isEurope = room.location && room.location.continent === "Europe";
    const isNorway = room.location && room.location.country === "Norway";

    const hasRating = room.rating >= 2;

    return isEurope && isNorway && hasRating;
  });

  return (
    <div>
      <div className="flex space-x-6 overflow-scroll scrollbar-hide">
        {filteredRooms.map((room, index) => (
          <div key={index}>
            <Link to={`/venue/${room.id}`}>
              <HomeCard
                imageUrl={room.media}
                title={room.name}
                maxGuests={room.maxGuests}
                price={room.price}
                wifi={room.meta.wifi}
                breakfast={room.meta.breakfast}
                pets={room.meta.pets}
                parking={room.meta.parking}
                city={room.location.city}
                country={room.location.country}
                continent={room.location.continent}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards;
