import React, { useEffect, useState } from "react";
import Loading from "../components/Ui/Loading";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Button from "../components/Ui/Button";
import Input from "../components/Ui/Input";
//import useApi from "../useApi";
//import { getAllVenues } from "../../../api";
import noImage from "../assets/noPic.jpg";
import { getAllVenues } from "../api";
import useApi from "../hooks/useApi";

const Venues = ({
  searchQuery,
  filteredVenues,
  setFilteredVenues,
  filteredProperties,
}) => {
  const { data: rooms, isLoading, isError } = useApi(getAllVenues);
  const [destination, setDestination] = useState("");

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [price, setPrice] = useState(500);
  const [guest, setGuest] = useState(1);

  const handleSearch = async () => {
    try {
      const startDate = format(date[0].startDate, "yyyy-MM-dd");
      const endDate = format(date[0].endDate, "yyyy-MM-dd");

      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/venues?_bookings=true&_owner=true&sort=created&sortOrder=desc",
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.length > 0) {
        const filteredProperties = data.filter((property) => {
          const locationMatches =
            !destination ||
            property.location.country.toLowerCase() ===
              destination.toLowerCase();

          const isAvailable =
            !date[0] ||
            property.bookings.every((booking) => {
              const bookingStartDate = new Date(booking.dateFrom);
              const bookingEndDate = new Date(booking.dateTo);
              const selectedStartDate = new Date(startDate);
              const selectedEndDate = new Date(endDate);
              console.log(
                format(selectedStartDate, "dd/MM/yyyy"),
                format(selectedEndDate, "dd/MM/yyyy"),

                format(bookingStartDate, "dd/MM/yyyy"),
                format(bookingEndDate, "dd/MM/yyyy"),
              );
              return (
                selectedStartDate <= bookingStartDate ||
                selectedEndDate >= bookingEndDate
              );
            });
          console.log(isAvailable);

          const isWithinPriceRange = price === "" || property.price <= price;

          const hasEnoughGuestCapacity =
            guest === "" || property.maxGuests >= guest;

          return (
            locationMatches && isWithinPriceRange && hasEnoughGuestCapacity
          );
        });

        console.log("Filtered Result:", filteredProperties);
      } else {
        console.log("No properties found");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredRooms = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredVenues(filteredRooms);
    }
  }, [searchQuery, rooms, setFilteredVenues]);

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
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
      <div className="  justify-center px-4  mb-4 flex ">
        <div className="flex-1  rounded-md">
          <h1 className="text-lg font-semibold text-gray-700 mb-4">Search</h1>
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex align-center">
              <Input
                id={destination}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                type="text"
                icon="fa faUser"
                label="Destination"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <label className="text-xs">Check-in Date</label>
            <span
              className="h-10 px-2 bg-white flex items-center whitespace-nowrap cursor-pointer"
              onClick={() => setOpenDate(!openDate)}
            >{`${
              date[0].startDate
                ? format(date[0].startDate, "dd/MM/yyyy")
                : "Select start date"
            } to ${
              date[0].endDate
                ? format(date[0].endDate, "dd/MM/yyyy")
                : "Select end date"
            }`}</span>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <label className="text-xs">Price: ${price}</label>
            <Input
              type="range"
              id="price"
              className="w-full border"
              min="0"
              max="1000"
              step="10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <label className="text-xs">Guests</label>
            <Input
              type="number"
              min={1}
              className="w-20 border px-2"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </div>
          <Button
            className="py-2 border bg-black w-full font-semibold cursor-pointer"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      {searchQuery && filteredVenues.length === 0 ? (
        <p>No search results found.</p>
      ) : (
        (searchQuery ? filteredVenues : rooms).map((room) => (
          <div key={room.id}>
            <Link to={`/venue/${room.id}`}>
              <div className="flex flex-col xl:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease">
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
                <div className="flex flex-col flex-grow pl-4 pt-2">
                  <div className="flex justify-between">
                    <div className="text-xs flex items-center mb-1">
                      <BsMap className="m-2" />
                      {room.location.country}
                    </div>
                    <p className="px-5 mr-2 text-xl font-semibold">
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
        ))
      )}
    </div>
  );
};

export default Venues;
