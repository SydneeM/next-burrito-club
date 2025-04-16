"use client"

import { RestaurantDocument } from "@/app/api/restaurants/route";
import { Review } from "@/app/api/restaurants/route";
import { useState } from "react";

interface ReviewsProps {
  restaurant: RestaurantDocument;
}

export default function Reviews({ restaurant }: ReviewsProps) {
  const [text, setText] = useState<string>("");

  const handleSubmit = async () => {
    const updatedReviews: Review[] = JSON.parse(JSON.stringify(restaurant.reviews));
    const newReview: Review = {
      rating: 3,
      comment: text,
      user: "me"
    };
    updatedReviews.push(newReview);

    const response = await fetch("http://localhost:3000/api/restaurants", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateId: restaurant._id, updatedReviews })
    });
    const status = await response.json();
    console.log(status);
  }

  return (
    <div className="flex flex-col">
      <span>{restaurant.restaurant}</span>
      <label>
        Write your post:
        <textarea
          value={text}
          name="postContent"
          rows={4}
          cols={50}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Add Review</button>
    </div>
  );
}
