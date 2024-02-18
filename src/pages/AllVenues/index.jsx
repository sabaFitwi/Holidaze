import React, { useState, useEffect } from "react";

import useApi from "../../hooks/useApi";
import { getAllVenues } from "../../api";
import sorting from "../../Data/ContinentsData";
import Sort from "./SortBar";
import Search from "./Search";
import ContinentFilter from "./ContinentsFilter";
import Venues from "./Venues";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import SEO from "../../components/SEO";

function AllVenues() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: venues, isLoading, isError } = useApi(getAllVenues);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedContinent, setSelectedContinent] = useState("");

  let filteredVenues = venues;
  if (selectedContinent && selectedContinent !== "All") {
    filteredVenues = venues.filter(
      (venue) => venue.location.continent === selectedContinent,
    );
  }
  filteredVenues = filteredVenues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortBy === "maxGuests") {
      return sortOrder === "asc"
        ? a.maxGuests - b.maxGuests
        : b.maxGuests - a.maxGuests;
    } else if (sortBy === "rating") {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  const handleContinentFilter = (continent) => {
    setSelectedContinent(continent);
  };

  useEffect(() => {
    setSearchQuery("");
  }, [selectedContinent]);

  if (isLoading) {
    return <div className="align-middle">Loading...</div>;
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
    <div className="dark:bg-darkPrimary">
      <SEO
        title="Venues | Holidaze"
        description="Explore unique accommodations worldwide with Holidaze. Discover the perfect getaway for your next adventure."
      />
      <main className="w-full md:container mx-auto p-4">
        <section>
          <h1 className="h1 dark:text-white capitalize font-semibold mb-2 text-center">
            Venues in all the continents
          </h1>
          <div className="mb-6">
            <ContinentFilter
              sorting={sorting}
              selectedContinent={selectedContinent}
              handleContinentFilter={handleContinentFilter}
            />
          </div>
        </section>
        <div className="bg-black text-white p-4 justify-around">
          <div className="flex flex-col sm:flex-row items-center  justify-between gap-2">
            <Sort
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>
        <section className="w-full flex flex-col lg:flex-row py-4">
          <Venues sortedVenues={sortedVenues} />
        </section>
        <ScrollToTopButton />
      </main>
    </div>
  );
}

export default AllVenues;
