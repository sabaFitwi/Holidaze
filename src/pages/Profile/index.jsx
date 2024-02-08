// Profile.jsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import Tabs from "../../components/Ui/Tabs";
import Breadcrumb from "../../components/Ui/Breadcrumbs";
import ScrollToTopButton from "../../components/ScrollToTopButton";

function Profile() {
  const pathSegments = ["Home", "Profile"];
  const [activeTab, setActiveTab] = useState("My Booking");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Breadcrumb pathSegments={pathSegments} activeTab={activeTab} />
      <div className="flex flex-col lg:flex-row">
        <ProfileCard />

        <div className="w-full mx-auto ">
          <div className="bg-white p-2 md:p-6 ">
            <Tabs onTabChange={handleTabChange} />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Profile;
