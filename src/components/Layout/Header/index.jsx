import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import imageBrand from "../../../assets/logo/logo1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
        <NavLink
          exact
          to="/"
          activeClassName="active"
          className="flex items-center"
        >
          <IoHomeOutline size={20} />
          <p className="pl-2 hidden sm:block"> Home</p>
        </NavLink>
        <NavLink
          to="/venues"
          activeClassName="active"
          className="flex items-center"
        >
          <LuLayoutList size={20} />
          <p className="pl-2 hidden sm:block"> Browse</p>
        </NavLink>
        {isLoggedIn && profileData && profileData.avatar && !loading ? (
          <div className="flex justify-center border-2 rounded-full shadow-sm bg-gray-100">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="hidden sm:block rounded-full w-10 h-10"
            />
          </div>
        ) : isLoggedIn ? (
          <NavLink
            to={"/profile"}
            onClick={handleNav}
            className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 rounded-full"
          >
            {profileData &&
              profileData.name &&
              profileData.name.charAt(0).toUpperCase()}
          </NavLink>
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
                    ? "nav-dropdown ease-in duration-300 absolute top-16 right-0 transform translate-x-0 opacity-100 z-10"
                    : "nav-dropdown transform translate-x-0 opacity-0 duration-200 absolute top-16 right-0 z-10 pointer-events-none"
                }
              >
                <div className="bg-white dark:bg-black shadow-lg rounded-lg">
                  <NavLink
                    to="/profile"
                    activeClassName="active"
                    className="flex items-center pl-3  hover:bg-gray-500"
                    onClick={() => {
                      handleNav();
                    }}
                  >
                    {" "}
                    <FaRegCircleUser size={16} />
                    <p className="block px-4 py-2 "> Profile</p>
                  </NavLink>

                  <div className=" space-y-4 divide-y divide-gray-500 text-center ">
                    {isVenueManager && (
                      <div className="">
                        <NavLink
                          to="/create"
                          activeClassName="active"
                          className="flex items-center pl-3 hover:bg-gray-500 whitespace-nowrap"
                          onClick={() => {
                            handleNav();
                          }}
                        >
                          {" "}
                          <AiOutlineForm />
                          <p className="block px-4 py-2">Create Venue</p>
                        </NavLink>
                      </div>
                    )}{" "}
                    <DarkModeButton
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                    />
                    <div className=" relative flex items-center  hover:bg-gray-500">
                      <div className="absolute right-4">
                        <FiLogOut />
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleNav();
                        }}
                        className=" block px-4 py-2  whitespace-nowrap"
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
          <div className="relative">
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
                  ? "nav-dropdown ease-in duration-300 absolute top-16 right-0 transform translate-x-0 opacity-100 z-10"
                  : "nav-dropdown transform translate-x-0 opacity-0 duration-200 absolute top-16 right-0 z-10 pointer-events-none"
              }
            >
              <div className=" bg-white dark:bg-black dark:text-white shadow-lg rounded-lg">
                <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                <Link
                  to={"/Login"}
                  className={` flex items-center pl-3 hover:bg-gray-500  whitespace-nowrap ${
                    nav ? "block" : "hidden"
                  }`}
                >
                  <FiLogIn size={16} />
                  <p className="px-4 py-2">Login</p>
                </Link>
                <Link
                  to={"/Register"}
                  className={`whitespace-nowrap  hover:bg-gray-500 block pl-10 pr-4 py-2 ${
                    nav ? "block" : "hidden"
                  }`}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
