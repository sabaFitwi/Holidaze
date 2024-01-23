// Banner.js
import React from "react";
//import bannerVideo from "../../../assets/cont/bannerVideo.mp4";
import SearchByName from "../../../components/Search/SearchByName";

const Banner = () => {
  const handleSearch = (destination, checkInDate, checkOutDate) => {
    // Implement your search logic here
    console.log("Searching for:", destination, checkInDate, checkOutDate);
  };

  return (
    <header className="relative h-[300px] lg:h-[400px] xl:h-[500px]">
      {/* <video
        className="banner-video absolute inset-0 w-full h-full z-0 object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <SearchByName onSearch={handleSearch} />
    </header>
  );
};

export default Banner;
