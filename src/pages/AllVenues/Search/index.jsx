import React from "react";

const SearchInput = () => {
  return (
    <div className="mx-auto w-[60%] mt-8">
      <div className="relative mb-3">
        <input
          type="search"
          id="exampleSearch2"
          placeholder="Type query"
          className="peer block min-h-[auto] w-full rounded border  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
        <label
          htmlFor="exampleSearch2"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-600 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Search
        </label>
      </div>
    </div>
  );
};

export default SearchInput;
