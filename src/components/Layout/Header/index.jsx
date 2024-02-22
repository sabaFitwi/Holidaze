import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import imageBrand from "../../../assets/logo/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import LogOut from "../../LogOut";
import useAvatar from "../../../hooks/useAvatar";
import DarkModeButton from "../../utils/DarkMode";
import { AiOutlineForm } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { FiLogIn, FiLogOut } from "react-icons/fi";

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
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between  sm:justify-around p-5 md:px-10 shadow-md bg-white text dark:text-white dark:bg-darkPrimary`}
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

      <div className="flex justify-end items-center space-x-3 sm:space-x-4">
        <Link to="/" className="flex items-center">
          <IoHomeOutline size={20} />
          <p className=" hover:text-underline pl-2 hidden sm:block"> Home</p>
        </Link>
        <Link
          to={"./../venues"}
          className="flex items-center  pl-1 sm:pl-2 hover:text-gray-900 "
        >
          <LuLayoutList size={20} />
          <p className=" hover:text-underline pl-2 hidden sm:block"> Browse</p>
        </Link>
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
                id="hamburger-menu"
              />
              <div
                ref={dropdownRef}
                className={
                  nav
                    ? "nav-dropdown ease-in duration-300 absolute top-12 right-5 transform translate-x-0 opacity-100 z-10"
                    : "nav-dropdown transform translate-x-0 opacity-0 duration-200 absolute top-12 right-5 z-10 pointer-events-none"
                }
              >
                <div className="bg-white shadow-lg rounded-lg">
                  <DarkModeButton
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <Link
                    to="/profile"
                    onClick={() => {
                      handleNav();
                    }}
                    className="flex items-center pl-3  hover:bg-gray-100"
                  >
                    {" "}
                    <FaRegCircleUser size={16} />
                    <p className="block px-4 py-2 text-gray-800"> Profile</p>
                  </Link>

                  <div className=" space-y-4 divide-y divide-gray-500 text-center ">
                    {isVenueManager && (
                      <div className="">
                        <Link
                          to="/create"
                          className="flex items-center pl-3 hover:bg-gray-100 whitespace-nowrap"
                          onClick={() => {
                            handleNav();
                          }}
                        >
                          {" "}
                          <AiOutlineForm />
                          <p className="block px-4 py-2 text-gray-800">
                            Create Venue
                          </p>
                        </Link>
                      </div>
                    )}

                    <div className=" relative flex items-center  hover:bg-gray-100">
                      <div className="absolute right-4">
                        <FiLogOut />
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleNav();
                        }}
                        className=" block px-4 py-2 text-gray-800  whitespace-nowrap"
                        data-cy="logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <HiMenuAlt3
              onClick={handleNav}
              className="nav-toggle z-20 group-hover:rotate-180 duration-300 cursor-pointer relative"
              size={25}
              id="hamburger-menu"
            />
            <div
              ref={dropdownRef}
              className={
                nav
                  ? "nav-dropdown ease-in duration-300 absolute top-12 right-30 transform translate-x-0 opacity-100 z-10"
                  : "nav-dropdown transform translate-x-0 opacity-0 duration-200 absolute top-12 right-30 z-10 pointer-events-none"
              }
            >
              <div className="bg-white shadow-lg rounded-lg">
                <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                <Link
                  to={"/Login"}
                  className={`whitespace-nowrap hover:text-gray-900 block px-4 py-2 text-gray-800 flex-row ${
                    nav ? "block" : "hidden"
                  }`}
                >
                  <div className="whitespace-nowrap flex item-center p-4">
                    {" "}
                    <FiLogIn size={16} />
                    <p>Login</p>
                  </div>
                </Link>
                <Link
                  to={"/Register"}
                  className={`whitespace-nowrap hover:text-gray-900 block px-4 py-2 text-gray-800 ${
                    nav ? "block" : "hidden"
                  }`}
                >
                  Register
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
