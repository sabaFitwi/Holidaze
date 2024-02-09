// Search.js
import React from "react";

function Search({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search venues..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="bg-black text-white border-white border  text rounded p-1 ml-2"
    />
  );
}

export default Search;
