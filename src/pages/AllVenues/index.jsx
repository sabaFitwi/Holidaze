import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import noImage from "../../assets/noPic.jpg";
import useApi from "../../hooks/useApi";
import australiaImg from "../../assets/cont/12.png";
import africaImg from "../../assets/cont/7.png";
import asiaImg from "../../assets/cont/9.png";
import europaImg from "../../assets/cont/1.png";
import northAmericaImg from "../../assets/cont/4.png";
import southAmericaImg from "../../assets/cont/14.png";
import { getAllVenues } from "../../api";

function AllVenues() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: venues, isLoading, isError } = useApi(getAllVenues);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedContinent, setSelectedContinent] = useState("");

  // Continent data
  const sorting = [
    {
      name: "All",
      image: null, // You can set an image for the "All" option if needed
    },
    {
      name: "Africa",
      image: africaImg,
    },
    {
      name: "Asia",
      image: asiaImg,
    },
    {
      name: "Australia",
      image: australiaImg,
    },
    {
      name: "Europe",
      image: europaImg,
    },
    {
      name: "North America",
      image: northAmericaImg,
    },
    {
      name: "South America",
      image: southAmericaImg,
    },
  ];

  // Filtering and sorting logic
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
    }
  });

  // Function to handle continent filter selection
  const handleContinentFilter = (continent) => {
    setSelectedContinent(continent);
  };

  // Effect to clear search query on continent change
  useEffect(() => {
    setSearchQuery("");
  }, [selectedContinent]);

  // Loading and error handling
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
    <main className="w-full p-4">
      <section>
        <h1 className="h1 font-semibold mb-2 text-center">
          Venues in all the continents
        </h1>
        <div className="mb-6">
          <div className="flex mx-auto space-x-3 sm:space-x-6 overflow-x-scroll scrollbar-hide">
            {sorting.map((obj, index) => (
              <div
                key={index}
                onClick={() => handleContinentFilter(obj.name)}
                className={`flex items-center m-2 whitespace-nowrap space-x-4 cursor-pointer border rounded-full pl-3 pr-6 py-2 xl:py-0 hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out ${
                  selectedContinent === obj.name ? "bg-gray-900 text-white" : ""
                }`}
              >
                <div className="relative hidden xl:inline-block h-12">
                  {obj.image && (
                    <img
                      src={obj.image}
                      alt={obj.name}
                      className="h-8 w-8 mt-2 rounded-lg"
                    />
                  )}
                </div>
                <div className="text-center xs:text-xs">
                  <h2>{obj.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-black text-white p-4 flex justify-between">
        <div className="flex items-center">
          <select
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black text-white text-xs border-white border rounded p-1 ml-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
          <select
            name="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-black text-white text-xs border-white border rounded p-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search venues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-black text-white border-white border rounded p-1 ml-2"
        />
      </div>
      <section className="w-full flex flex-col lg:flex-row py-4">
        <div className="mx-auto grid w-full">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {sortedVenues.map((venue) => (
              <div key={venue.id}>
                <Link to={`/venue/${venue.id}`}>
                  <div className="flex flex-col xl:flex-row border cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out ease">
                    <div className="relative w-full h-40 xl:w-60 flex-shrink-0">
                      {venue.media && venue.media[0] ? (
                        <img
                          src={venue.media[0]}
                          alt={venue.name}
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
                          {venue.location.country}
                        </div>
                        <p className="px-5 mr-2 text-xl font-semibold">
                          {venue.price}
                          <span className="text-sm font-light">/night</span>
                        </p>
                      </div>
                      <h4 className="text-gray-900 font-bold text-lg mb-2">
                        {venue.name}
                      </h4>
                      <div className="flex items-center pb-4">
                        <img
                          className="w-10 h-10 rounded-full mr-4"
                          src={venue.owner?.avatar}
                          alt="Avatar of Writer"
                        />
                        <div className="text-sm ">
                          <p className="text-gray-900 leading-none">
                            {venue.owner?.name}
                          </p>
                          <p className="text-gray-600">Aug 18</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {sortedVenues.length === 0 && <p>No venues found.</p>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AllVenues;
