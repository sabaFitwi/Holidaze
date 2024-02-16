// import React from 'react';
//import { continents } from '../../ContinentFilter';

// function HomeContinentFilter() {
//   return (
//     <div className="flex flex-wrap justify-center mx-4 sm:justify-center">
//       {continents.map((continent, index) => (
//         <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-4">
//           <div className="max-w-xs mx-auto p-6 shadow-md rounded-xl sm:px-6 lg:flex-col">
//             <img
//               src={continent.image}
//               alt={continent.name}
//               className="w-32 h-32 mx-auto rounded-full aspect-square"
//             />
//             <div className="space-y-4 text-center divide-y divide-gray-700">
//               <div className="my-2 space-y-1">
//                 <h2 className="text-xl font-semibold sm:text-2xl">{continent.name}</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default HomeContinentFilter;
import React from "react";
import australiaImg from "../../../assets/cont/12.png";
import africaImg from "../../../assets/cont/14.png";
import asiaImg from "../../../assets/cont/9.png";
import europaImg from "../../../assets/cont/12.png";
import northAmericaImg from "../../../assets/cont/4.png";
import southAmericaImg from "../../../assets/cont/14.png";

const continents = [
  {
    name: "Africa",
    image: africaImg,
  },
  {
    name: "Asia",
    image: asiaImg,
  },
  {
    name: "Europe",
    image: europaImg,
  },
  {
    name: "N.America",
    image: northAmericaImg,
  },
  {
    name: "S.America",
    image: southAmericaImg,
  },
  {
    name: "Australia",
    image: australiaImg,
  },
];

function SortByContinent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 w-full mx-auto">
      {continents.map((continent, index) => (
        <div key={index} className=" ">
          <div className="flex items-center mt-5 space-x-4 rounded-full cursor-pointer hover:bg-gray-100">
            <div className="relative">
              <img
                src={continent.image}
                alt={continent.name}
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <h2 className="">{continent.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SortByContinent;
