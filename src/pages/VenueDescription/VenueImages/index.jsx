import React from "react";

function VenueImages({ images, setActive }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {images.map((imgUrl, index) => (
        <div key={index}>
          <img
            onClick={() => setActive(imgUrl)}
            src={imgUrl}
            className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
            alt="Venues-Preview"
          />
        </div>
      ))}
    </div>
  );
}

export default VenueImages;
