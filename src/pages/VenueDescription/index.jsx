import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Ui/Button";
import Input from "../../components/Ui/Input";
import { useFetchData } from "../../hooks/useGetData";
import { bookingUrl, createVenueUrl } from "../../api";
import StarRating from "../../components/RatingStars";
import DateInput from "../../components/Ui/DateInput";
import VenueImages from "./VenueImages";
import VenueAmenities from "./VenueAmenities";
import { daysSincePosted } from "../../components/utils/DateSincePost";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import usePOST from "../../hooks/UsePost";
import SEO from "../../components/SEO";
import Breadcrumb from "../../components/Ui/Breadcrumbs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

function VenueDescription({ onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(0);
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [validationMessage, setValidationMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [active, setActive] = useState(null);
  const [totalNights, setTotalNights] = useState(0);
  const pathSegments = ["Home", "Detail"];

  const { data, isLoading, error } = useFetchData(
    createVenueUrl + `/${id}?_bookings=true&_owner=true`,
  );
  const { postRequest: postBookingRequest } = usePOST();

  const existingBookings = data && data.bookings ? data.bookings : [];

  useEffect(() => {
    if (data && data.media && data.media.length > 0) {
      setActive(data.media[0]);
    }
  }, [data]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const pricePerNight = data.price || 0;

      const startTime = startDate.getTime();
      const endTime = endDate.getTime();

      const differenceInTime = endTime - startTime;

      const nightCount = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      const totalNights = nightCount + 1;
      setTotalNights(totalNights);

      const newTotalCost = pricePerNight * totalNights * guests;
      setTotalCost(newTotalCost.toFixed(2));
    };

    calculateTotalCost();
  }, [startDate, endDate, guests, data.price]);

  const maxGuests = data.maxGuests || 0;

  const handleGuestChange = (e) => {
    let newGuests = parseInt(e.target.value, 10);

    if (newGuests > maxGuests) {
      setValidationMessage(`Maximum ${maxGuests} guests allowed`);

      newGuests = maxGuests;
    } else if (newGuests < 1) {
      setGuests(guests);
      setValidationMessage("Minimum 1 guest required");

      newGuests = 1;
    } else {
      setGuests(newGuests);
      setValidationMessage("");
    }
  };

  const handleFiltersSubmit = async () => {
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    if (!isAuthenticated) {
      setValidationMessage("You are not logged in. Please login.");
      return;
    }

    if (!startDate || !endDate) {
      console.error("Start date or end date is undefined");
      return;
    }

    if (!id) {
      console.error("Venue ID is missing");
      setValidationMessage("Venue ID is required.");
      return;
    }
    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: guests,
      venueId: id,
    };

    try {
      const { success, error } = await postBookingRequest(
        `${bookingUrl}`,
        bookingData,
      );

      if (success) {
        setSuccessMessage("Booking successful!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/profile");
        }, 1000);

        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error("Error during booking", error);
        setValidationMessage("Error during booking. Please try again.");
      }
    } catch (error) {
      console.error("Error during booking", error);
      setValidationMessage("Error during booking. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <div className="dark:bg-darkSecondary dark:text-white">
      <SEO
        title="Detail | Holidaze"
        description="Select dates and explore all the venue details. Easy booking, easy planning with Holidaze."
      />
      <Breadcrumb pathSegments={pathSegments} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="h1 mb-4 font-bold  capitalize md:hidden">{data.name}</h1>
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="w-full md:w-[60%] divide-y">
            <div className="md:flex-1 px-4 divide-y">
              <div className="grid gap-4">
                <img
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                  src={active}
                  alt="venueImage"
                />
                <VenueImages images={data.media} setActive={setActive} />
              </div>
            </div>
            <div className="flex items-center py-4 mt-4 ">
              <img
                className="w-20 h-20 rounded-full m-4"
                src={data.owner?.avatar}
                alt="Avatar of Writer"
              />
              <div className="text-sm ">
                <h4 className=" text-sm">
                  Hosted by
                  <span className="font-bold mx-2">{data.owner?.name}</span>
                </h4>
                <p className=" text-xs">
                  Posted. {daysSincePosted(data.updated)} ago
                </p>
                <div className="flex items-center pb-2">
                  <StarRating rating={data.rating} />
                  <span className="ml-1 text-sm">({data.rating})</span>
                </div>
              </div>
            </div>
            <div className=" divide-y">
              <VenueAmenities data={data} />
              <div className="flex my-4 ml-4 py-4">
                <IoIosPeople className="mr-2 w-5 h-5" />
                <span className="text-sm">Maximum Guests {data.maxGuests}</span>
              </div>
            </div>
          </div>

          <div className=" w-full md:w-[40%]  px-4">
            <h1 className="h1 mb-4 font-bold capitalize hidden md:block">
              {data.name}
            </h1>
            <p>{data.description}</p>

            <div className="flex items-center space-x-4 my-4">
              <div className="rounded-lg bg-gray-100 flex items-end py-2 px-3 ">
                <span className="font-bold text-primary text-xl">
                  {data.price} kr
                </span>

                <span className=" mx-2 dark:text-primary text-sm">/Night</span>
              </div>
            </div>
            <div>
              <div className="my-4">
                <div className="flex items-center mb-1">
                  <IoCalendarNumberOutline className="w-5 h-5" />
                  <p className="ml-2 text-sm font-semibold dark:font-normal">
                    CheckIn - Checkout
                  </p>
                </div>

                <DateInput
                  label="Check-In"
                  value={{ startDate, endDate }}
                  onChange={(date) => {
                    setStartDate(date.startDate);
                    setEndDate(date.endDate);
                  }}
                  placeholder="Choose a date"
                  existingBookings={existingBookings}
                  className="text-sm mt-1 border"
                />
              </div>

              <div className=" my-4 ">
                <div className="flex item-center mb-1">
                  <IoIosPeople className="w-5 h-5" />
                  <p className="ml-2  font-semibold dark:font-normal text-sm">
                    Guests
                  </p>
                </div>

                <Input
                  type="number"
                  placeholder="Number of guests"
                  value={guests}
                  onChange={handleGuestChange}
                  className=" border text-sm mt-1 "
                />
                {validationMessage && (
                  <div className="text-red-500 text-sm mt-2 divide-y">
                    {validationMessage}
                  </div>
                )}
              </div>
              {successMessage && (
                <div className="text-green-500 text-sm mt-2">
                  {successMessage}
                </div>
              )}

              <div className="flex-1 text-right border-b border-t ">
                <p>Night(s): {totalNights}</p>
                <p className=" text-xl font-semibold dark:font-normal">
                  Total Price: {totalCost} kr
                </p>
              </div>

              <div className="mt-4 text-center">
                <Button
                  type="button"
                  onClick={handleFiltersSubmit}
                  className={`button ${
                    successMessage ? "cursor-not-allowed" : ""
                  }`}
                  disabled={successMessage ? true : false}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </div>
  );
}

export default VenueDescription;
