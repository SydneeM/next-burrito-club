"use client"

import { useState } from "react";
import { Restaurant } from "@/app/api/restaurants/route";

function RestaurantInput() {
  const [restaurant, setRestaurant] = useState<string>("");
  const [buyer, setBuyer] = useState<string>("");

  const handleSubmit = async () => {
    if (restaurant !== "" && restaurant.trim().length !== 0 &&
      buyer !== "" && buyer.trim().length !== 0) {
      const time: number = Date.now();
      const newRestaurant: Restaurant = { buyer, restaurant, time, ratings: [], reviews: [] };
      const response = await fetch("http://localhost:3000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurant)
      });
      const status = await response.json();
      console.log(status);

      setRestaurant("");
      setBuyer("");
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <input
        autoComplete="off"
        value={restaurant}
        placeholder="Restaurant"
        onChange={(e) => setRestaurant(e.target.value)}
      />
      <input
        autoComplete="off"
        value={buyer}
        placeholder="Buyer"
        onChange={(e) => setBuyer(e.target.value)}
      />
      <button
        onClick={handleSubmit}
      >
        Let&apos;s Eat
      </button>
    </div>
  );
}

export default RestaurantInput;
