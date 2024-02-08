export const daysSincePosted = (createdDate) => {
  if (!createdDate) {
    return "N/A";
  }
  const currentDate = new Date();
  const postedDate = new Date(createdDate);

  if (isNaN(postedDate.getTime())) {
    return "Invalid date"; // Handle the case where the date is invalid
  }

  const differenceInSeconds = Math.floor((currentDate - postedDate) / 1000);
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30;
  const secondsInYear = secondsInDay * 365;

  if (differenceInSeconds < secondsInMinute) {
    return (
      differenceInSeconds + " second" + (differenceInSeconds > 1 ? "s" : "")
    );
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return minutes + " minute" + (minutes > 1 ? "s" : "");
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return hours + " hour" + (hours > 1 ? "s" : "");
  } else if (differenceInSeconds < secondsInMonth) {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return days + " day" + (days > 1 ? "s" : "");
  } else if (differenceInSeconds < secondsInYear) {
    const months = Math.floor(differenceInSeconds / secondsInMonth);
    return months + " month" + (months > 1 ? "s" : "");
  } else {
    const years = Math.floor(differenceInSeconds / secondsInYear);
    return years + " year" + (years > 1 ? "s" : "");
  }
};
