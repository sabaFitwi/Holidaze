import React, { useState } from "react";

const AvatarInput = ({ onChange }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const url = event.target.value;
    setAvatarUrl(url);
    validateUrl(url);
  };

  const validateUrl = (url) => {
    const pattern = /^((http|https):\/\/)/;

    if (!url.trim()) {
      setError("Please enter an avatar URL.");
    } else if (!pattern.test(url)) {
      setError("Please enter a valid URL.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!error) {
      onChange(avatarUrl);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter Avatar URL"
        value={avatarUrl}
        onChange={handleInputChange}
        className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={error}
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Save Avatar
      </button>
    </div>
  );
};

export default AvatarInput;
