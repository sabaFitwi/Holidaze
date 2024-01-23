import React from "react";
import Filter from "./filterIcon";
import australiaImg from "../../../assets/cont/12.png";
import africaImg from "../../../assets/cont/7.png";
import asiaImg from "../../../assets/cont/9.png";
import europaImg from "../../../assets/cont/1.png";
import northAmericaImg from "../../../assets/cont/4.png";
import southAmericaImg from "../../../assets/cont/14.png";

const Filters = () => {
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
  return (
    <div className=" mb-6 ">
      <div
        className="flex  mx-auto space-x-3
       sm:space-x-6  overflow-x-scroll scrollbar-hide"
      >
        {sorting.map((obj) => (
          <Filter name={obj.name} image={obj.image} />
        ))}
      </div>
    </div>
  );
};

export default Filters;
