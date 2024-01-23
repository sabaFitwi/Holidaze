// import React from "react";

// const FilterBar = () => {
//   return (
//     <div className="bg-black text-white p-4 flex justify-between">
//       <div className="flex items-center">
//         <label className="mr-2 text-sm">Price:</label>
//         <select className="bg-black text-white text-xs border-white border rounded p-1">
//           <option value="highToLow">High to Low</option>
//           <option value="lowToHigh">Low to High</option>
//         </select>
//       </div>

//       <div className="flex items-center">
//         <label className="mr-2 text-sm">Name:</label>
//         <select className="bg-black text-white border-white text-xs border rounded p-1">
//           <option value="aToZ">A to Z</option>
//           <option value="zToA">Z to A</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default FilterBar;

import React from "react";

const SortBar = () => {
  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <div className="flex items-center">
        <select className="bg-black text-white text-xs border-white border rounded p-1">
          <option value="price">Price</option>
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>

      <div className="flex items-center">
        <select className="bg-black text-white border-white text-xs border rounded p-1">
          <option value="name">Name</option>
          <option value="aToZ">A to Z</option>
          <option value="zToA">Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;
