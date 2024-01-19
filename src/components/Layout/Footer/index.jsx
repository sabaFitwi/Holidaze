import React from "react";

const Footer = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 justify-evenly text-center gap-y-4 px-32
    py-14 bg-gray-300"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <p>About</p>
        <p>Contact</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <p>About</p>
        <p>Contact</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <p>About</p>
        <p>Contact</p>
      </div>
    </div>
  );
};

export default Footer;
