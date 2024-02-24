import React from "react";
import { Link } from "react-router-dom";
import sorting from "../../../Data/ContinentsData";

function SortByContinent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-full mx-auto">
      {sorting.slice(1).map((option, index) => (
        <div key={index}>
          <Link to={"/venues"}>
            <div className="flex items-center mt-5 space-x-4 rounded-full cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-500">
              <div className="relative">
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.name}
                    className="h-16 w-16 rounded-full"
                  />
                )}
              </div>
              <div>
                <h2 className="">{option.name}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SortByContinent;
