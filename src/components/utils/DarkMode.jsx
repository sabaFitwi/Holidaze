import React from "react";

function DarkModeButton({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
      }}
      className="bg-black text-white px-5 py-3 rounded focus:outline-none"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default DarkModeButton;
