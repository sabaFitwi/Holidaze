// Sort.js
import React from "react";

function Sort({ sortBy, setSortBy, sortOrder, setSortOrder }) {
  return (
    <div className="flex items-center">
      <select
        name="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-black text-white text-xs border-white border rounded p-1"
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="date">Date</option>
        <option value="maxGuests">Max Guests</option>
        <option value="rating">Rating</option>
      </select>
      <select
        name="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="bg-black text-white text-xs border-white border rounded p-1 ml-2"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default Sort;
