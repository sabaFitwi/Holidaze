import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import imageBrand from "../../../assets/logo/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "../../LogOut";
import useAvatar from "../../../hooks/useAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Ui/Button";

import DarkModeButton from "../../utils/DarkMode";

function Navbar({ darkMode, setDarkMode }) {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const { profileData, loading } = useAvatar();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const updateAuthStatus = () => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);

    const venueManager = localStorage.getItem("isVenueManager") === "true";
    setIsVenueManager(venueManager);
  };

  useEffect(() => {
    updateAuthStatus();

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("nav-toggle")
      ) {
        setNav(false);
        document.body.style.overflow = "scroll";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    LogOut();
    updateAuthStatus();
    navigate("/");
  };

  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between p-5 md:px-10 shadow-md bg-white text dark:text-white dark:bg-darkPrimary`}
    >
      <Link
        to="/"
        className="relative w-1/2 flex items-center cursor-pointer my-auto"
      >
        <img
          src={imageBrand}
          alt="brand"
          className="absolute w-full  h-[85px] object-contain object-left"
        />
      </Link>

      <div className="flex justify-end items-center space-x-1 sm:space-x-4">
        <Link to="/" className=" hover:text-underline">
          Home
        </Link>
        <Link to={"./../venues"} className=" pl-1 sm:pl-2 hover:text-gray-900 ">
          Browse
        </Link>
        <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />

        {isLoggedIn && profileData && profileData.avatar && !loading ? (
          <div className="flex justify-center border-2 rounded-full shadow-sm bg-gray-100">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="hidden sm:block rounded-full w-10 h-10"
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
                className="nav-toggle z-20 group-hover:rotate-180 duration-300 cursor-pointer"
                size={25}
              />
              <div
                ref={dropdownRef}
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
                      handleNav();
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    Profile
                  </Link>
                  <div className=" space-y-4 divide-y divide-gray-500 text-center ">
                    {isVenueManager && (
                      <Link
                        to="/create"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                        onClick={() => {
                          handleNav();
                          document.body.style.overflow = "scroll";
                        }}
                      >
                        Create Venue
                      </Link>
                    )}

                    <div className=" relative flex items-center">
                      <div className="absolute right-4">
                        <FontAwesomeIcon
                          icon={faArrowRightFromBracket}
                          className="text-gray-400"
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleNav();
                          document.body.style.overflow = "scroll";
                        }}
                        className=" block px-4 py-2 text-gray-800 hover.bg-gray-100  whitespace-nowrap"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              to="./../Register"
              className="text-gray-600 hover:text-gray-900 ml-4"
            >
              Register
            </Link>
            <Button className="px-4 py-2 flex items-center">
              <Link
                to={"./../Login"}
                className="text-gray-600 whitespace-nowrap hover:text-gray-900 ml-4"
              >
                Sign in
              </Link>
              <div className="ml-2">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="text-gray-400"
                />
              </div>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
