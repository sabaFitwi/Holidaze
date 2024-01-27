import React from "react";
import Input from "../../../components/Ui/Input";

const SearchInput = () => {
  return (
    <div className="mx-auto boarder-md w-[60%] mt-8">
      <Input
        icon={<i className="fas fa-heart" />}
        type="search"
        id="Search"
        placeholder="Type query"
        label="Search"
        color="primary"
      />
    </div>
  );
};

export default SearchInput;
