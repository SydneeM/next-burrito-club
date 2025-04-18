"use client"

import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "#fce356";

interface RatingsProps {
  editable: boolean;
  rating: number;
  handleRating?: (value: number) => void;
}

export default function Ratings({ editable, rating, handleRating }: RatingsProps) {
  const stars = Array(DEFAULT_COUNT).fill(DEFAULT_ICON);
  const [temporaryRating, setTemporaryRating] = useState<number>(0);

  const handleMouseEnter = (rating: number) => {
    if (editable) {
      setTemporaryRating(rating);
    }
  }

  const handleMouseLeave = () => {
    if (editable) {
      setTemporaryRating(0);
    }
  }

  const handleClick = (rating: number) => {
    if (editable && handleRating) {
      handleRating(rating);
    }
  };

  return (
    <div className="flex flex-row">
      {stars.map((item, index) => {
        const active = temporaryRating
          ? index < temporaryRating
          : index < rating;

        const elementColor = active
          ? DEFAULT_COLOR
          : DEFAULT_UNSELECTED_COLOR;

        return (
          <div
            className={`text-xl ${editable && "cursor-pointer hover:scale-[1.2]"}`}
            key={index}
            style={{
              color: elementColor,
              filter: `${active ? "grayscale(0%)" : "grayscale(100%)"}`,
            }}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index + 1)}
          >
            {DEFAULT_ICON}
          </div>
        );
      })}
    </div>
  );
}
