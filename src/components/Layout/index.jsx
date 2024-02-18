import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Outlet } from "react-router-dom";

function Layout({ darkMode, setDarkMode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default Layout;
