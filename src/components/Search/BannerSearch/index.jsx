import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import backgroundImage from "../../../assets/banner/15.png";

const BannerSearch = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    guest: 1,
  });

  const navigate = useNavigate();
  const dateRangeRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target)
      ) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOption = (operation) => {
    setOptions((prevOptions) => ({
      guest: operation === "i" ? prevOptions.guest + 1 : prevOptions.guest - 1,
    }));
  };

  const handleSearch = () => {
    navigate("/venues", { state: { destination, date, options } });
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center bg-slate-500 h-full flex justify-center items-center relative "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className=" w-full max-w-4xl text-center my-auto">
        <h1 className="h1 overlay ">Experience Comfort, Stay Inspired</h1>

        <div className=" overlay border mt-4 h-30  w-full max-w-4xl flex flex-col md:flex-row  items-center justify-between p-4 rounded-5 absolute  bottom-(-25)">
          <div className="flex items-center gap-4">
            <FaBed className=" w-7 h-7 " />
            <Input
              type="text"
              placeholder="Where are you going?"
              className="border-none outline-none px-4"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div
            className="flex items-center gap-4 p-2 relative"
            ref={dateRangeRef}
          >
            <label>
              <IoCalendarNumberOutline className="w-7 h-7 cursor-pointer" />
            </label>

            <span
              onClick={() => setOpenDate(!openDate)}
              className=" cursor-pointer"
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy",
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="absolute  bg-white left-1/2 top-full transform -translate-x-1/2 z-10"
                minDate={new Date()}
                onClickOutside={() => setOpenDate(false)}
              />
            )}
          </div>
          <div className="relative">
            <div className="flex items-center p-2">
              <BsPeople size={20} />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="text-lightgray cursor-pointer"
              >{`${options.guest} guest`}</span>
            </div>
            {openOptions && (
              <div className="absolute top-full left-0 p-4 bg-white text-gray-700 rounded shadow-md">
                <div className="flex items-center gap-2">
                  <span>guest</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={options.guest <= 1}
                      className="border border-primary  px-2 py-1 cursor-pointer"
                      onClick={() => handleOption("d")}
                    >
                      -
                    </button>
                    <span>{options.guest}</span>
                    <button
                      className="border border-primary  px-2 py-1 cursor-pointer"
                      onClick={() => handleOption("i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <Button
              className="bg-black text-white font-semibold "
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSearch;
