import React from "react";
import Loading from "../../../components/Ui/Loading";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getAllVenues } from "../../../services/api";
import useApi from "../../../hooks/useApi";
import noImage from "../../../assets/noPic.jpg";

const CardVenue = () => {
  const { data: rooms, isLoading, isError } = useApi(getAllVenues);
  console.log(rooms);
  if (isLoading) {
    return (
      <div className="align-middle">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>Error fetching data.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid grid-cols-1  sm:grid-cols-2 gap-4  w-full ">
      {rooms.map((room) => (
        <div key={room.id}>
          <Link to={`/venue/${room.id}`}>
            <div className="flex flex-col xl:flex-row  border  cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out eas ">
              <div className="relative w-full h-40 xl:w-60 flex-shrink-0">
                {room.media && room.media[0] ? (
                  <img
                    src={room.media[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={noImage}
                    alt="ImagePreview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className=" flex flex-col flex-grow pl-4 pt-2">
                <div className="flex justify-between">
                  <div className="text-xs flex items-center mb-1">
                    <BsMap className="m-2" />
                    {room.location.country}
                  </div>
                  <p className="px-5 mr-2 text-xl font-semibold">
                    {" "}
                    {room.price}
                    <span className="text-sm font-light">/night</span>
                  </p>
                </div>

                <h4 className="text-gray-900 font-bold text-lg mb-2">
                  {room.name}
                </h4>

                <div className="flex items-center pb-4">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={room.owner?.avatar}
                    alt="Avatar of Writer"
                  />
                  <div className="text-sm ">
                    <p className="text-gray-900 leading-none">
                      {room.owner?.name}
                    </p>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardVenue;
