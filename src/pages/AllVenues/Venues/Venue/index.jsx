// import React from "react";

// const VenueCard = ({ media, title, description, price }) => {
//   return (
//     <div className="w-full lg:w-full lg:flex">
//       <div
//         className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
//         style={{ backgroundImage: `url(${media})` }}
//         title="Venue"
//       ></div>
//       <div className=" lg:w-3/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//         <div className="mb-8">
//           <div className="text-xs flex items-center mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke-width="1.5"
//               stroke="currentColor"
//               class="w-5 h-5 mr-2 text-red-700"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//               />
//             </svg>
//             Soho, London
//           </div>
//           <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
//           <p className="text-gray-700 text-base">{description}</p>
//         </div>
//         <div className="flex items-center">
//           <img
//             className="w-10 h-10 rounded-full mr-4"
//             src={media}
//             alt="Avatar of Writer"
//           />
//           <div className="text-sm">
//             <p className="text-gray-900 leading-none">John Smith</p>
//             <p className="text-gray-600">Aug 18</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VenueCard;

import React from "react";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";

const VenueCard = ({
  id,
  title,
  description,
  media,
  price,
  maxGuests,
  created,
  updated,
  meta,
  bookings,
  owner,
  location,
}) => {
  if (!meta && !owner && !bookings) {
    return null;
  }

  const { wifi, parking, breakfast, pets } = meta;

  // Destructing owner data
  const { name: ownerName, email, avatar } = owner;
  return (
    <Link to={`/venue/${id}`}>
      <div className="flex flex-col xl:flex-row  border  cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out eas ">
        <div className="relative w-full h-40 xl:w-60 flex-shrink-0">
          <img src={media} alt="" className="w-full h-full object-cover" />
        </div>
        <div className=" flex flex-col flex-grow pl-4 pt-2">
          <div className="flex justify-between">
            <div className="text-xs flex items-center mb-1">
              <BsMap className="m-2" />
              Soho, London
            </div>
            <p className="px-5 mr-2 text-xl font-semibold">
              {" "}
              {price}
              <span className="text-sm font-light">/night</span>
            </p>
          </div>

          <h4 className="text-gray-900 font-bold text-lg mb-2">{title}</h4>
          <p className="text-sm pt-3 text-gray-500 flex-grow">{description}</p>

          <div className="flex items-center pb-4">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={avatar}
              alt="Avatar of Writer"
            />
            <div className="text-sm ">
              <p className="text-gray-900 leading-none">name</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
