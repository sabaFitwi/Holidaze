import React from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <TiStarFullOutline key={i} className="text-yellow-500 text-sm" />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <TiStarHalfOutline
        key={`${fullStars}-half`}
        className="text-yellow-500 text-sm"
      />,
    );
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <TiStarOutline
        key={`${fullStars + i}-empty`}
        className="text-yellow-500 text-sm"
      />,
    );
  }

  return <div className="flex">{stars}</div>;
}

export default StarRating;
