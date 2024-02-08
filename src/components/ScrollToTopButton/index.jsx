import React, { useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", toggleVisibility);
    return () => {
      document.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {isVisible && (
        <div
          className=" text-black p-1 rounded-full cursor-pointer"
          onClick={scrollToTop}
        >
          <BsArrowUpSquareFill className="text-2xl w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
