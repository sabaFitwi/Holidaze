import React from "react";
import australiaImg from "../../../assets/cont/12.png";
import africaImg from "../../../assets/cont/14.png";
import asiaImg from "../../../assets/cont/9.png";
import europaImg from "../../../assets/cont/12.png";
import northAmericaImg from "../../../assets/cont/4.png";
import southAmericaImg from "../../../assets/cont/14.png";

const continents = [
  {
    name: "Africa",
    image: africaImg,
  },
  {
    name: "Asia",
    image: asiaImg,
  },
  {
    name: "Europe",
    image: europaImg,
  },
  {
    name: "N.America",
    image: northAmericaImg,
  },
  {
    name: "S.America",
    image: southAmericaImg,
  },
  {
    name: "Australia",
    image: australiaImg,
  },
];

function SortByContinent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-full mx-auto">
      {continents.map((continent, index) => (
        <div key={index}>
          <div className="flex items-center mt-5 space-x-4 rounded-full cursor-pointer hover:bg-gray-100">
            <div className="relative">
              <img
                src={continent.image}
                alt={continent.name}
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <h2 className="hover:text-black">{continent.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SortByContinent;
