import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import noImage from "../assets/noPic.jpg";

import australiaImg from "../assets/cont/12.png";
import africaImg from "../assets/cont/7.png";
import asiaImg from "../assets/cont/9.png";
import europaImg from "../assets/cont/1.png";
import northAmericaImg from "../assets/cont/4.png";
import southAmericaImg from "../assets/cont/14.png";

function Sort() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Continent data
  const sorting = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues?_bookings=true&_owner=true&sort=${sortBy}&sortOrder=${sortOrder}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venues");
        }

        const data = await response.json();
        setVenues(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [sortBy, sortOrder]);

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder") {
      setSortOrder(value);
    }
  };

  const handleContinentFilter = (continent) => {
    setSelectedContinent(continent);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  // Filter the venues based on the selected continent
  let filteredVenues = venues;
  if (selectedContinent) {
    filteredVenues = venues.filter(
      (venue) => venue.location.continent === selectedContinent,
    );
  }

  // Perform search on filtered venues
  filteredVenues = filteredVenues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort the venues based on the selected criteria and order
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
  });

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
                  selectedContinent === obj.name ? "bg-gray-100" : ""
                }`}
              >
                <div className="relative hidden xl:inline-block h-12">
                  <img
                    src={obj.image}
                    alt={obj.name}
                    className="h-8 w-8 mt-2 rounded-lg"
                  />
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
            name="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-black text-white text-xs border-white border rounded p-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            name="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="bg-black text-white text-xs border-white border rounded p-1 ml-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sort;
