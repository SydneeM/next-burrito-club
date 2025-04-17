"use client"

import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "gray";
const DEFAULT_COLOR = "#fadb8c";

interface RatingsProps {
  editable: boolean;
  initialRating: number;
  handleRating?: (value: number) => void;
}

export default function Ratings({ editable, initialRating, handleRating }: RatingsProps) {
  const stars = Array(DEFAULT_COUNT).fill(DEFAULT_ICON);
  const [rating, setRating] = useState<number>(initialRating);
  const [temporaryRating, setTemporaryRating] = useState<number>(0);

  const handleClick = (rating: number) => {
    if (handleRating) {
      setRating(rating);
      handleRating(rating);
    }
  };

  return (
    <div>
      {editable ? (
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
                onMouseEnter={() => setTemporaryRating(index + 1)}
                onMouseLeave={() => setTemporaryRating(0)}
                onClick={() => handleClick(index + 1)}
              >
                {DEFAULT_ICON}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-row">
          {stars.map((item, index) => {
            const active = temporaryRating
              ? index < temporaryRating
              : index < initialRating;

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
              >
                {DEFAULT_ICON}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}