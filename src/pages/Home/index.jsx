import React from "react";

import InfoSection from "./WelcomeText";
import Banner from "./Banner";

import FeaturedCards from "./FeaturedCard";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import SortByContinent from "./SortByContinent";
import SEO from "../../components/SEO";
const Home = () => {
  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <SEO
        title="Home | Holidaze"
        description="Discover unique accommodations worldwide with Holidaze. Find your perfect stay for your next adventure"
      />
      <Banner />
      <main className="w-full mx-auto px-8 sm:px-16 pt-20">
        <section>
          <InfoSection />
        </section>
        <section className="max-w-7xl mx-auto ">
          <h2 className="h2 font-semibold text-center"> Explore</h2>

          <SortByContinent />
        </section>
        {/* <section className="max-w-7xl"> <CardHome /></section> */}
        <section className="mt-24">
          <h2 className="h2 font-semibold text-center">
            Find the Most Popular Accommodations
          </h2>

          <FeaturedCards />
        </section>
      </main>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
