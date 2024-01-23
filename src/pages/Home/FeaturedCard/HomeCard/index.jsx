// import React from "react";
// import { Link } from "react-router-dom";

// const HomeCard = ({ imageUrl, title, description, price, id }) => {
//   return (
//     <Link to={`../../Venue/${id}`}>
//       <div className="bg-white rounded-lg shadow-lg p-4">
//         <div className="relative">
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-48 object-cover rounded-lg"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-black bg-opacity-60 text-white">
//             <button className="bg-yellow-500 px-4 py-2 rounded-md mr-2">
//               Price: {price}
//             </button>
//             <button className="bg-blue-500 px-4 py-2 rounded-md">
//               Book Now
//             </button>
//           </div>
//         </div>
//         <div className="mt-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <i className="fa fa-wifi text-black mr-1" aria-hidden="true"></i>
//           </div>
//           <div className="flex items-center">
//             <i className="fa fa-car text-black mr-1" aria-hidden="true"></i>
//           </div>
//           <div className="flex items-center">
//             <i className="fa fa-paw text-black mr-1" aria-hidden="true"></i>
//           </div>
//           <div className="flex items-center">
//             <i className="fa fa-coffee text-black mr-1" aria-hidden="true"></i>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default HomeCard;

// import React from 'react'
// import {BsArrowsFullscreen, BsPeople} from 'react-icons/bs'

// function HomeCard({id, title,imageUrl, maxGestes, description, price}) {
//   return (
//     <div className=' mb-4 shadow-2xl min-h-[500px] group'>
//       <div className='overflow-scroll '>
//         <img src={imageUrl} alt="" className=' group-hover:scale-110 transition-all duration-300 w-full' />

//         </div>

//     </div>
//   )
// }

// export default HomeCard

import React from "react";
import { BsCurrencyDollar, BsPeople } from "react-icons/bs";

function HomeCard({ id, title, imageUrl, maxGuests, description, price }) {
  const insertSpace = (text, interval) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      if ((i + 1) % interval === 0) {
        result += " ";
      }
    }
    return result;
  };
  return (
    <div className="min-h-[400px] cursor-pointer shadow-2xl group mt-12">
      <div className=" overflow-hidden h-40 w-60">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full  group-hover:scale-110 transition-all duration-300 "
        />
      </div>
      <div className="bg-white shadow-lg max-w-[200px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase  tracking-[1px] font-semibold text-base">
        <div className="flex justify-between w-[80%]">
          <div className="flex items-center">
            <div>
              <BsCurrencyDollar className="text-xs" />
            </div>
            <div className="flex gap-x-1 text-xs ">
              <span></span>
              <span>{price}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <BsPeople className="text-xs" />
            </div>
            <div className="flex gap-x-1 text-xs ">
              <span>Guests</span>
              <span>{maxGuests}m2</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <h3 className="p-5 text text- font-semibold ">
          {insertSpace(
            title
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            10,
          )}
        </h3>
        {/* <p className="px-5 text-gray-600 capitalize overflow-hidden">
        {insertSpace(description,10)}</p> */}
      </div>
    </div>
  );
}

export default HomeCard;
