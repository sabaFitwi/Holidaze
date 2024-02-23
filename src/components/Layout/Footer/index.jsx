import React from "react";

const Footer = () => {
  return (
    <div
      className="flex flex-col items-center text-center p-4
       text-white bg-black"
    >
      <h3 className=" p-4">About Holidaze</h3>
      <p className=" text-xs max-w-lg font-light">
        Simplifying holiday bookings. User-friendly for guests, efficient for
        admins. Powered by our API.
      </p>
    </div>
  );
};

export default Footer;
