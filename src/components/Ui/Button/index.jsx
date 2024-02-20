import React from "react";

function Button({ onClick, children, className, value }) {
  const defaultColor = "primary";
  const defaultSize = "py-3";

  const bgColorClass = className ? className : `bg-${defaultColor}`;

  return (
    <div>
      <button
        className={`px-8 ${defaultSize} font-semibold rounded-full ${bgColorClass} text-white`}
        onClick={onClick}
        value={value}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
