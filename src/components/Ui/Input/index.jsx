import React from "react";

const Input = ({
  id,
  name,
  type,
  placeholder,
  onChange,
  value,
  className,
  icon,
  label,
}) => {
  return (
    <div className="relative mb-3">
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <input
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`${className} peer border  block min-h-[auto] rounded  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
