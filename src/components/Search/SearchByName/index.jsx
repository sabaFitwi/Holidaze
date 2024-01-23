// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { getAllVenues } from "../../../services/api";
// import useApi from "../../../hooks/useApi";
// import CustomDateRangePicker from "../../utils/DatePicker";

// const SearchByName = ({ onSearch }) => {
//   const [destination, setDestination] = useState("");
//   const [name, setName] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [searchedNames, setSearchedNames] = useState([]);
//   const { data, isLoading, isError } = useApi(getAllVenues);

//   useEffect(() => {
//     // Extract unique venue names from the data for the dropdown menu
//     const uniqueNames = [...new Set(data.map((venue) => venue?.venue?.name))];
//     setSearchedNames(uniqueNames.map((name) => ({ value: name, label: name })));
//   }, [data]);

//   const handelSelect = (ranges) => {
//     if (ranges.startDate && ranges.endDate) {
//       setStartDate(ranges.startDate);
//       setEndDate(ranges.endDate);
//     }
//   };

//   const handleSearch = () => {
//     // Filter venues based on the entered name
//     const filteredVenues = data.filter((venue) =>
//       venue.venue.name.toLowerCase().includes(name.toLowerCase()),
//     );

//     // Call the onSearch callback with the filtered venues
//     onSearch(destination, name, startDate, endDate, filteredVenues);
//   };

//   return (
//     <div className="search-bar bg-gray-100 p-4 rounded-lg shadow-lg">
//       <div className="mb-4">
//         <label htmlFor="place" className="block text-gray-800 mb-1">
//           Destination
//         </label>
//         <Input
//           type="text"
//           id="place"
//           name="place"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           placeholder="Where are you going?"
//           className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="name" className="block text-gray-800 mb-1">
//           Name
//         </label>
//         <Select
//           options={searchedNames}
//           value={searchedNames.find((option) => option.value === name)}
//           onChange={(selectedOption) =>
//             setName(selectedOption ? selectedOption.value : "")
//           }
//           placeholder="Enter a name"
//         />
//       </div>

//       <div className="mb-4">
//         <label htmlFor="dateRange" className="block text-gray-800 mb-1">
//           Date Range
//         </label>
//         <CustomDateRangePicker
//           onSelect={(ranges) => handelSelect({ selection: ranges })}
//         />
//       </div>

//       <div>
//         <button
//           onClick={handleSearch}
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchByName;

import React, { useState, useRef, useEffect } from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";

const SearchByName = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    guest: 1,
  });

  const navigate = useNavigate();
  const dateRangeRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target)
      ) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOption = (operation) => {
    setOptions((prevOptions) => ({
      guest: operation === "i" ? prevOptions.guest + 1 : prevOptions.guest - 1,
    }));
  };

  const handleSearch = () => {
    navigate("/venues", { state: { destination, date, options } });
  };

  return (
    <div className="h-full bg-blue-800 text-white flex justify-center relative">
      <div className=" w-full max-w-4xl mx-auto ">
        <h1 className="text-2xl font-bold">
          A lifetime of discounts? It's Genius.
        </h1>
        <p className="text-gray-300">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free Lamabooking account
        </p>

        <div className="mt-4 h-30  w-full max-w-4xl  marker: bg-gray-500 border-3 border-yellow-500 flex flex-col lg:flex-row  items-center justify-around p-4 rounded-5 absolute  bottom-(-25)">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faBed} className="text-lightgray" />
            <Input
              type="text"
              placeholder="Where are you going?"
              className="border-none outline-none p-4"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 relative" ref={dateRangeRef}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-lightgray cursor-pointer"
            />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="text-lightgray cursor-pointer"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy",
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="absolute top-full left-0 z-10"
                minDate={new Date()}
                onClickOutside={() => setOpenDate(false)}
              />
            )}
          </div>
          <div className="relative">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPerson} className="text-lightgray" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="text-lightgray cursor-pointer"
              >{`${options.guest} guest`}</span>
            </div>
            {openOptions && (
              <div className="absolute top-full left-0 p-4 bg-white text-gray-700 rounded shadow-md">
                <div className="flex items-center gap-2">
                  <span>guest</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={options.guest <= 1}
                      className="border border-blue-500 text-blue-500 px-2 py-1 cursor-pointer"
                      onClick={() => handleOption("d")}
                    >
                      -
                    </button>
                    <span>{options.guest}</span>
                    <button
                      className="border border-blue-500 text-blue-500 px-2 py-1 cursor-pointer"
                      onClick={() => handleOption("i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <Button
              className="bg-blue-500 text-white font-semibold px-10 py-2"
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

export default SearchByName;
