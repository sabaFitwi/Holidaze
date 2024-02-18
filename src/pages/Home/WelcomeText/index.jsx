import React, { useEffect, useState } from "react";
import "animate.css/animate.css";
import { useInView } from "react-intersection-observer";

const InfoSection = () => {
  const [isTriggered, setTriggered] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setTriggered(true);
    }
  }, [inView]);

  return (
    <div
      className={`w-5/6 p-0 my-10 mx-auto max-w-screen-xl flex items-center justify-center ${
        isTriggered ? "animate__animated animate__fadeInUp" : ""
      }`}
    >
      <div
        ref={ref}
        className="md:w-3/2 mt-4 md:mt-0 md:p-8 md:pt-4 text-center"
      >
        <h1 className="h1 mb-4">Welcome to Holidayz</h1>

        <p className="text-gray-700 dark:text-white">
          Discover your dream escapes and book extraordinary accommodations for
          your next adventure. And if you have a special place to share, become
          a host and let others experience it, making unforgettable memories
          together.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;
