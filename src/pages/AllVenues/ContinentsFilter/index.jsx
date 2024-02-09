import React from "react";

function ContinentFilter({
  sorting,
  selectedContinent,
  handleContinentFilter,
}) {
  return (
    <div className="flex mx-auto space-x-3 sm:space-x-6 overflow-x-scroll scrollbar-hide">
      {sorting.map((obj, index) => (
        <div
          key={index}
          onClick={() => handleContinentFilter(obj.name)}
          className={`flex items-center m-2 whitespace-nowrap space-x-4 text cursor-pointer border rounded-full pl-3 pr-6 py-2 xl:py-0 hover:shadow-lg transition transform duration-100 ease-out ${
            selectedContinent === obj.name ||
            (index === 0 && !selectedContinent)
              ? "bg-gray-900 text-white"
              : ""
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
          <div className="text-center text">
            <h2>{obj.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContinentFilter;
