import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import imageBrand from "../../../assets/2.jpg";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogOut from "../../LogOut";
import useAvatar from "../../../hooks/useAvatar";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { profileData, loading } = useAvatar(); // Using the useAvatar hook

  const handleLogout = () => {
    LogOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <nav className="sticky top-0 z-50 grid grid-cols-2 bg-white p-5 md:px-10 shadow-md">
      <Link
        to="/"
        className="relative  flex items-center cursor-pointer my-auto"
      >
        <img
          src={imageBrand}
          alt=""
          className="absolute  w-30 h-12 object-contain object-left"
        />
      </Link>

      <div className="flex justify-end items-center space-x-4">
        <Link to={"./../venues"} className="text-gray-600 hover:text-gray-900">
          Hosts
        </Link>
        <Link to="./../contact" className="text-gray-600 hover:text-gray-900">
          contact
        </Link>
        {isLoggedIn && profileData && profileData.avatar && !loading ? (
          <div className="flex justify-center border-2 rounded-full shadow-sm bg-gray-100">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="rounded-full w-10 h-10"
            />
          </div>
        ) : isLoggedIn ? (
          <Link
            to={"/profile"}
            onClick={handleNav}
            className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 rounded-full"
          >
            {profileData &&
              profileData.name &&
              profileData.name.charAt(0).toUpperCase()}
          </Link>
        ) : null}

        {isLoggedIn ? (
          <>
            <div className="relative group">
              <HiMenuAlt3
                onClick={handleNav}
                className="z-20 text-black group-hover:rotate-180 duration-300 cursor-pointer"
                size={25}
              />
              <div
                className={
                  nav
                    ? "nav-dropdown ease-in duration-300 absolute top-12 right-0 transform translate-x-0 opacity-100 z-10"
                    : "nav-dropdown transform translate-x-0 opacity-0 duration-200 absolute top-12 right-0 z-10 pointer-events-none"
                }
              >
                <div className="bg-white shadow-lg rounded-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setNav(false);
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/create"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                    onClick={() => {
                      setNav(false);
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    Create Venue
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setNav(false);
                      document.body.style.overflow = "scroll";
                    }}
                    className="block px-4 py-2 text-gray-800 hover.bg-gray-100  whitespace-nowrap"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to={"./../Login"}
              className="text-gray-600 hover:text-gray-900 ml-4"
            >
              Sign in
            </Link>
            <Link
              to="./../Register"
              className="text-gray-600 hover:text-gray-900 ml-4"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;