import React from "react";
//import ContinentFilter from "../../../components/ContinentFilter";
import SearchInput from "./Search";
import Filter from "./Filter";
import CardVenue from "./Venues";

import Filters from "./ContinentsFilter/filterIcons";
import SortBar from "./SortBar";
import List from "../../components/filterS";

function AllVenue() {
  return (
    <div>
      <main className=" container mx-auto px-6">
        <SearchInput />
        <section>
          <p className="text-xs">300 venues found with {this} serch</p>
          <h1 className="h1 font-semibold mt-6 mb-12  text-center">
            Venues in all the continents
          </h1>
          <Filters />

          <SortBar />
        </section>

        <section className="flex  flex-col lg:flex-row py-4 ">
          <List className="lg:w-2xl" />
          <CardVenue className="lg:w-2/4" />
        </section>
      </main>
    </div>
  );
}

export default AllVenue;
