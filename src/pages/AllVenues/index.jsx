import React from "react";
//import ContinentFilter from "../../../components/ContinentFilter";
import SearchInput from "./Search";
//import Filter from "./Filter";
import CardVenue from "./Venues";

import Filters from "./ContinentsFilter/filterIcons";
import SortBar from "./SortBar";
import List from "./SideFilter";

function AllVenue() {
  return (
    <main className=" w-full p-4">
      <SearchInput />
      <section>
        <p className="text-xs">300 venues found with {this} search</p>
        <h1 className="h1 font-semibold mt-6 mb-12  text-center">
          Venues in all the continents
        </h1>
        <Filters />

        <SortBar />
      </section>

      <section className="w-full flex flex-col lg:flex-row py-4 ">
        <List />
        <CardVenue className="lg:w-[75%]" />
      </section>
    </main>
  );
}

export default AllVenue;
