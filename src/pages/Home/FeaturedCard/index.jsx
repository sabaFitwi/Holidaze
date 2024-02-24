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
    // Check if the length of the media array is greater than 2
    const hasMultipleImages = room.media && room.media.length >= 2;

    return hasMultipleImages;
  });

  return (
    <div>
      <div className="flex space-x-6 overflow-scroll scrollbar-hide">
        {filteredRooms.map((room) => (
          <div key={room.id}>
            <Link to={`/venue/${room.id}`}>
              <HomeCard
                media={room.media}
                name={room.name}
                maxGuests={room.maxGuests}
                price={room.price}
                rating={room.rating}
                wifi={room.meta.wifi}
                breakfast={room.meta.breakfast}
                pets={room.meta.pets}
                parking={room.meta.parking}
                city={room.location.city}
                country={room.location.country}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards;
