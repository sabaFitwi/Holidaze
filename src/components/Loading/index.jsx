import React from "react";

function Loader() {
  return (
    <div className="flex items-center mt-10 justify-center space-x-2">
      <div className=" text-primary font-primary-font dark:text-primary-hover">
        Loading
      </div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary dark:bg-primary-hover"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary dark:bg-primary-hover"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary dark:bg-primary-hover"></div>
    </div>
  );
}

export default Loader;
