import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function DarkModeButton({ darkMode, setDarkMode }) {
  return (
    <div
      className="flex items-center pl-3 hover:bg-gray-500 whitespace-nowrap"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? (
        <div className="flex items-center  hover:bg-gray-500 whitespace-nowrap">
          <MdOutlineLightMode size={16} />
          <p className="px-4 py-2">Light Mode</p>
        </div>
      ) : (
        <div className="flex items-center  hover:bg-gray-500 whitespace-nowrap">
          <MdOutlineDarkMode size={16} />
          <p className="px-4 py-2">Dark Mode</p>
        </div>
      )}
    </div>
  );
}

export default DarkModeButton;
