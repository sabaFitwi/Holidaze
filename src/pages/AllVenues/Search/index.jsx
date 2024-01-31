// import React from "react";
// import Input from "../../../components/Ui/Input";

// const SearchInput = ({ onSearch, setFilteredVenues }) => {
//   const handleInputChange = (event) => {
//     const query = event.target.value;
//     onSearch(query);

//     if (!query) {
//       setFilteredVenues([]);
//     }
//   };

//   return (
//     <div className="mx-auto boarder-md  w-full md:w-[60%] my-4">
//       <Input
//         type="search"
//         id="Search"
//         placeholder="Type query"
//         label="Search"
//         color="primary"
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// };

// export default SearchInput;
import React from "react";
import Input from "../../../components/Ui/Input";

const SearchInput = ({ onSearch, setFilteredVenues }) => {
  // const handleInputChange = (event) => {
  //   const query = event.target.value;
  //   onSearch(query);

  //   if (!query) {
  //     setFilteredVenues([]);
  //   }
  // };

  return (
    <div className="mx-auto boarder-md  w-full md:w-[60%] my-4">
      <Input
        type="search"
        id="Search"
        placeholder="Type query"
        label="Search"
        color="primary"
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchInput;
