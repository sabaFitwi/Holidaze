import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const Dateinput = ({ value, onChange, placeholder, existingBookings }) => {
  const [openDate, setOpenDate] = useState(false);

  const handleDateChange = (ranges) => {
    onChange(ranges.selection);
  };

  const isDateDisabled = (date) => {
    // Implement your logic to check if the date is already booked
    return existingBookings.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  return (
    <div className="relative">
      <span
        className="h-10 px-2 bg-white flex items-center cursor-pointer"
        onClick={() => setOpenDate(!openDate)}
      >
        {value.startDate && value.endDate
          ? `${format(value.startDate, "dd/MM/yyyy")} to ${format(
              value.endDate,
              "dd/MM/yyyy",
            )}`
          : placeholder}
      </span>
      {openDate && (
        <DateRange
          onChange={handleDateChange}
          minDate={new Date()}
          ranges={[value]}
          rangeColors={["#18766a"]}
          showDateDisplay={false}
          disabledDates={isDateDisabled} // Pass the function to disable dates
        />
      )}
    </div>
  );
};

export default Dateinput;
