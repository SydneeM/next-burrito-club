"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RestaurantDocument } from "@/app/api/restaurants/route";
import { Review } from "@/app/api/restaurants/route";
import Ratings from "./Ratings";
import { average } from "@/utils/average";

interface ReviewsProps {
  restaurants: RestaurantDocument[];
  user: string;
  row: number;
}

export default function Reviews({ restaurants, user, row }: ReviewsProps) {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleRating = (value: number) => {
    setRating(value);
  }

  const handleSubmit = async () => {
    const updatedReviews: Review[] = JSON.parse(JSON.stringify(restaurants[row].reviews));
    const newReview: Review = {
      rating,
      comment: text,
      user
    };
    updatedReviews.push(newReview);

    const updatedRatings: number[] = JSON.parse(JSON.stringify(restaurants[row].ratings));
    updatedRatings.push(rating);

    const response = await fetch("http://localhost:3000/api/restaurants", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateId: restaurants[row]._id, updatedReviews, updatedRatings })
    });
    const status = await response.json();
    console.log(status);

    setText("");
    setRating(0);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="">{restaurants[row].restaurant}</h3>
      <div className="flex flex-col gap-y-1">
        <h4>Rating</h4>
        <Ratings editable={false} rating={average(restaurants[row].ratings)} />
      </div>
      <div className="flex flex-col gap-y-1">
        <h4>Reviews</h4>
        <div className="flex flex-col gap-y-2">
          {restaurants[row].reviews.map((review) => (
            <div
              key={`${review.user}-${review.comment}`}
              className="bg-gray-100 py-2 px-4 rounded-lg"
            >
              <span>{review.user}</span>
              <Ratings editable={false} rating={review.rating} />
              <p>{review.comment}</p>
            </div>
          ))}
          {restaurants[row].reviews.length === 0 &&
            <span>No reviews yet</span>
          }
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <h4>Write a Review</h4>
        <div className="flex flex-col gap-y-2 border-1 border-gray-300 py-2 px-4 rounded-lg">
          <Ratings editable={true} rating={rating} handleRating={handleRating} />
          <textarea
            className="py-2 px-4 focus:outline-[#b6cae1]"
            value={text}
            name="reviewContent"
            rows={4}
            cols={50}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="dashboard-button w-fit py-2 px-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
