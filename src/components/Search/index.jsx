// // import React, { useState } from "react";
// // import CustomDatePicker from "../utils/DatePicker";

// // const SearchBar = ({ onSearch }) => {
// //   const [destination, setDestination] = useState("");
// //   // const [dateRange, setDateRange] = useState([
// //   //   {
// //   //     startDate: new Date(),
// //   //     endDate: new Date(),
// //   //     key: "selection",
// //   //   },
// //   // ]);

// //   const handleSearch = () => {
// //     // onSearch(destination, dateRange[0].startDate, dateRange[0].endDate);
// //   };

// //   return (
// //     <div className="search-bar">
// //       <div
// //         className="bg-gray-100 mx-auto
// //        p-4 rounded-lg shadow-lg w-lg max-w-screen-lg flex-col md:items-end"
// //       >
// //         {/* Destination input */}
// //         <div className="md:w-1/3 mb-3 md:mb-0 mr-4">
// //           <label htmlFor="place" className="block text-gray-800 mb-1">
// //             Destination
// //           </label>
// //           <input
// //             type="text"
// //             id="place"
// //             name="place"
// //             value={destination}
// //             onChange={(e) => setDestination(e.target.value)}
// //             placeholder="Where are you going?"
// //             className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
// //           />
// //         </div>

// //         {/* Date range picker */}
// //         <div className="md:w-1/3 mb-3 md:mb-0 mr-4">
// //           <label htmlFor="dateRange" className="block text-gray-800 mb-1">
// //             Date Range
// //           </label>
// //           <CustomDatePicker
// //           // ranges={dateRange}
// //           // onChange={(ranges) => setDateRange([ranges.selection])}
// //           />
// //         </div>

// //         {/* Search button */}
// //         <div className="md:w-1/3">
// //           <button
// //             onClick={handleSearch}
// //             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchBar;

// import React, { useState } from "react";
// import DateInput from "../Inputs/DateInput";
// import CustomDateRangePicker from "../utils/DatePicker";

// const SearchBar = ({ onSearch }) => {
//   const [destination, setDestination] = useState("");

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   const handelSelect = (ranges) => {
//     if (ranges.startDate && ranges.endDate) {
//       setStartDate(ranges.startDate);
//       setEndDate(ranges.endDate);
//     }
//   };

//   const handleSearch = () => {
//     onSearch(destination, dateRange[0].startDate, dateRange[0].endDate);
//   };

//   return (
//     <div className="search-bar bg-gray-100 p-4 rounded-lg shadow-lg">
//       <div className="mb-4">
//         <label htmlFor="place" className="block text-gray-800 mb-1">
//           Destination
//         </label>
//         <input
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
//         <label htmlFor="dateRange" className="block text-gray-800 mb-1">
//           Date Range
//         </label>
//         <CustomDateRangePicker
//           onSelect={(range) => handelSelect({ selection: range })}
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

// export default SearchBar;
