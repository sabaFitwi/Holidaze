import React from "react";

function Input({ id, name, type, placeholder, onChange, value, className }) {
  return (
    <input
      id={id}
      name={name || "name"}
      type={type || "text"}
      placeholder={placeholder || "Enter text..."}
      className={`px-4 border rounded-md  input-field ${className}`}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
