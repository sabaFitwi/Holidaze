import React from "react";

const Filter = ({ image, name }) => {
  return (
    <div className="flex items-center m-2 whitespace-nowrap space-x-4 cursor-pointer border rounded-full  pl-3 pr-6 py-2 xl:py-0  hover:shadow-lg  active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
      <div className="relative hidden xl:inline-block  h-12">
        <img src={image} alt={name} className=" h-8 w-8 mt-2 rounded-lg" />
      </div>
      <div className="text-center xs:text-xs  ">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Filter;
