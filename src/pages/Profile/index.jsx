// Profile.jsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import Tabs from "../../components/Ui/Tabs";
import Breadcrumb from "../../components/Ui/Breadcrumbs";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import SEO from "../../components/SEO";

function Profile() {
  const pathSegments = ["Home", "Profile"];
  const [activeTab, setActiveTab] = useState("My Booking");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dark:bg-darkPrimary">
      <SEO
        title="Profile | Holidaze"
        description="Take control of your Holidaze profile. view, update, and delete your bookings and venues. Customize your avatar to make it your own."
      />
      <Breadcrumb pathSegments={pathSegments} activeTab={activeTab} />
      <main className="flex flex-col lg:flex-row">
        <ProfileCard />

        <div className="w-full mx-auto">
          <div className="  p-0 md:p-6 ">
            <Tabs onTabChange={handleTabChange} />
          </div>
        </div>
      </main>
      <ScrollToTopButton />
    </div>
  );
}

export default Profile;
