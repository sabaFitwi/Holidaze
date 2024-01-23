// Profile.jsx
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import Tabs from "../../components/Ui/Tabs";
import Breadcrumb from "../../components/Ui/Breadcrumbs";

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

        <div className="container mx-auto sticky top-5 lg:top-20 bg-white p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Tabs onTabChange={handleTabChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
