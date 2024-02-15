import React from "react";

import InfoSection from "./WelcomeText";
import Banner from "./Banner";

import SmallCard from "./SortByContinent";
import FeaturedCards from "./FeaturedCard";
import ScrollToTopButton from "../../components/ScrollToTopButton";
const Home = () => {
  return (
    <div>
      <head>
        <title>Holidayz</title>
      </head>
      <Banner />
      <main className="w-full mx-auto px-8 sm:px-16 pt-20">
        <section>
          <InfoSection />
        </section>
        <section className="max-w-5xl mx-auto px-8 sm:px-16">
          <h2 className="text-3xl font-semibold text-center"> Explor</h2>

          <SmallCard />
        </section>
        {/* <section className="max-w-7xl"> <CardHome /></section> */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold text-center">
            Find Cheapest Accommodation
          </h2>

          <FeaturedCards />
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
