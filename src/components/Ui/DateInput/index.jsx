import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const DateInput = ({ value, onChange, placeholder, existingBookings }) => {
  const [openDate, setOpenDate] = useState(false);

  const selectedRange = {
    startDate: value.startDate,
    endDate: value.endDate,
    key: "selection",
  };

  const formattedStartDate = value.startDate
    ? format(value.startDate, "dd/MM/yyyy")
    : "";
  const formattedEndDate = value.endDate
    ? format(value.endDate, "dd/MM/yyyy")
    : "";

  const disabledDates = existingBookings.reduce((acc, booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const currentDate = new Date(start);

    while (currentDate <= end) {
      acc.push(format(currentDate, "yyyy-MM-dd"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return acc;
  }, []);

  const isDateDisabled = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return disabledDates.includes(formattedDate);
  };

  return (
    <div className="relative">
      <span
        className="h-10 p-2 bg-white flex items-center cursor-pointer border"
        onClick={() => setOpenDate(!openDate)}
      >
        {formattedStartDate && formattedEndDate
          ? `${formattedStartDate} to ${formattedEndDate}`
          : placeholder}
      </span>
      {openDate && (
        <DateRange
          onChange={(item) => onChange(item.selection)}
          minDate={new Date()}
          ranges={[selectedRange]}
          rangeColors={["#18766a"]}
          showDateDisplay={false}
          disabledDates={disabledDates.map((date) => new Date(date))}
          isDateBlocked={isDateDisabled}
        />
      )}
    </div>
  );
};

export default DateInput;
