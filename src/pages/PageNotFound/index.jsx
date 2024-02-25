import React from "react";

import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

//

function PageNotFound() {
  return (
    <div>
      <SEO
        title="404 page | Holidaze"
        description="Oops! It looks like you've wandered off the beaten path. Return to Holidaze's homepage and continue your journey to find the perfect accommodation for your next adventure."
      />
      <main>
        <div className="h-screen w-screen  flex items-center">
          <div className="container flex flex-col md:flex-row items-center justify-center px-5 dark:text-white text-gray-700">
            <div className="max-w-md">
              <div className="text-5xl font-dark font-bold">404</div>
              <p className="text-2xl md:text-3xl font-light leading-normal">
                Sorry we couldn't find this page.{" "}
              </p>
              <p className="mb-8">
                But dont worry, you can find plenty of other things on our
                homepage.
              </p>

              <Link
                to={"./"}
                className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-primary  hover:bg-secondary"
              >
                back to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageNotFound;
