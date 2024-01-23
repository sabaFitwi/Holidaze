// import ProgressBar from "@badrap/bar-of-progress";
// import Router from next/router
// export const progress = new ProgressBar({

//     size: 2,

//     color: "#29e",

//     className: "z-50",

//     delay: 80,
// });

// Router.events.on(routeChangeStart, progress.start);
// Router.events.on(routeChangecomplete, progress.finish);

// ProgressBar.jsx
import React, { useEffect } from "react";
import ProgressBar from "@badrap/bar-of-progress";

const CustomProgressBar = () => {
  useEffect(() => {
    const progressBar = new ProgressBar({
      size: 2,
      color: "#29e",
      className: "z-50",
    });

    progressBar.start();
    setTimeout(() => progressBar.finish(), 2000);
  }, []);

  return <div></div>;
};

export default CustomProgressBar;
