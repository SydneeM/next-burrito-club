"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Restaurant } from "@/app/api/restaurants/route";

function Input() {
  const router = useRouter();
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
      router.refresh();
    }
  }

  return (
    <div className="card w-[50%] min-w-80">
      <h3>Restaurant Selection</h3>
      <div className="flex flex-row w-full gap-x-2 ">
        <div className="flex flex-col w-full gap-y-2">
          <input
            autoComplete="off"
            className="border-1 border-gray-200 py-2 px-4 rounded-lg"
            value={restaurant}
            placeholder="Restaurant"
            onChange={(e) => setRestaurant(e.target.value)}
          />
          <input
            autoComplete="off"
            className="border-1 border-gray-200 py-2 px-4 rounded-lg"
            value={buyer}
            placeholder="Buyer"
            onChange={(e) => setBuyer(e.target.value)}
          />
        </div>
        <button
          className="rounded-lg bg-[#e3edf7] py-2 px-4 font-medium cursor-pointer hover:animate-pulse"
          onClick={handleSubmit}
        >
          Let&apos;s Eat
        </button>
      </div>
    </div>
  );
}

export default Input;
