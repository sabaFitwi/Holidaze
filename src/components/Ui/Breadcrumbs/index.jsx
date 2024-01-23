// Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pathSegments, activeTab, currentPage }) => {
  return (
    <div className="bg-gray-200 p-2 sticky top-24 w-full z-50">
      <div className="container mx-auto">
        {pathSegments.map((segment, index) => (
          <React.Fragment key={segment}>
            {index > 0 && <span className="mx-2">{">"}</span>}
            <Link
              to={`/${pathSegments.slice(1, index + 1).join("/")}`}
              className={`${
                index === pathSegments.length - 1
                  ? "text-blue-500 hover:underline"
                  : "text-gray-500"
              }`}
            >
              {segment}
            </Link>
          </React.Fragment>
        ))}
        {activeTab && (
          <>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-500">{activeTab}</span>
          </>
        )}
        {currentPage && (
          <>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-500">{currentPage}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
