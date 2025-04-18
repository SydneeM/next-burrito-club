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
    <div className="flex flex-col gap-y-2">
      <span>{restaurants[row].restaurant} Reviews</span>
      <Ratings editable={false} rating={average(restaurants[row].ratings)} />
      <div className="border-2">
        {restaurants[row].reviews.map((review) => (
          <div
            key={`${review.user}-${review.comment}`}
            className="flex flex-col gap-y-2 border-2"
          >
            <span>{review.user}</span>
            <Ratings editable={false} rating={review.rating} />
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col border-2">
        <label>
          Write your review:
          <Ratings editable={true} rating={rating} handleRating={handleRating} />
          <textarea
            value={text}
            name="reviewContent"
            rows={4}
            cols={50}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Add Review</button>
      </div>
    </div>
  );
}
