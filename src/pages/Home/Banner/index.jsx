import React from "react";

import BannerSearch from "../../../components/Search/BannerSearch";

const Banner = () => {
  const handleSearch = (destination, checkInDate, checkOutDate) => {
    console.log("Searching for:", destination, checkInDate, checkOutDate);
  };

  return (
    <header className="relative h-[300px] lg:h-[400px] xl:h-[500px]">
      <BannerSearch onSearch={handleSearch} />
    </header>
  );
};

export default Banner;
