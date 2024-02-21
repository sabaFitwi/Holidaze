import React from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function DarkModeButton({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
      }}
      className="bg-black text-white   focus:outline-none"
    >
      {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </button>
  );
}

export default DarkModeButton;
