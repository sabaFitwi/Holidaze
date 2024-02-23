import React from "react";

function ErrorMessage() {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error fetching data.</strong>
      <span className="block sm:inline">Please try again later.</span>
    </div>
  );
}

export default ErrorMessage;
