import React, { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Input from "./Ui/Input";
import Button from "./Ui/Button";

const List = () => {
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

  return (
    <div>
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-2xl flex gap-4">
          <div className="flex-1 bg-yellow-300 p-4 rounded-md sticky top-10">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Search</h1>
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-xs">Destination</label>
              <Input
                className="h-10 border-none px-2"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-xs">Check-in Date</label>
              <span
                className="h-10 px-2 bg-white flex items-center cursor-pointer"
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
                className="w-full"
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
                className="w-20 border-none px-2"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
            <Button
              className="button  py-2 border-none w-full font-semibold cursor-pointer"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
