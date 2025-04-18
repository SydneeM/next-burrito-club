"use client"

import { useState } from "react";
import { Button, Dialog, DialogPanel } from "@headlessui/react"
import { RestaurantDocument } from "@/app/api/restaurants/route";
import Ratings from "./Ratings";
import Reviews from "./Reviews";
import { average } from "@/utils/average";

interface HistoryProps {
  restaurants: RestaurantDocument[];
  user: string;
}

function History({ restaurants, user }: HistoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickedRow, setClickedRow] = useState<number | null>(null);

  const open = (clickedIndex: number) => {
    setClickedRow(clickedIndex);
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  return (
    <div className="card min-w-164 overflow-y-auto">
      <h3>Restaurant History</h3>
      <div className="rounded-lg overflow-y-auto">
        <div className="grid grid-cols-5 text-start py-2 px-4 rounded-t-lg bg-[#b6cae1]">
          <h4>Place</h4>
          <h4>Buyer</h4>
          <h4>Date</h4>
          <h4>Rating</h4>
          <h4>Reviews</h4>
        </div>
        {restaurants.map((restaurant, index) => (
          <div
            key={`${restaurant.restaurant}-${restaurant.time}`}
            className="grid grid-cols-5 text-star py-2 px-4 border-b-1 border-x-1 border-gray-200 last:rounded-b-lg"
          >
            <div className="flex items-center">
              <span className="">{restaurant.restaurant}</span>
            </div>
            <div className="flex items-center">
              <span className="">{restaurant.buyer}</span>
            </div>
            <div className="flex items-center">
              <span className="">{new Date(restaurant.time).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Ratings editable={false} rating={average(restaurant.ratings)} />
            </div>
            <div className="">
              <button
                className="py-2 px-4"
                onClick={() => open(index)}
              >
                View / Add
              </button>
            </div>
          </div>
        ))}
      </div>
      {clickedRow !== null &&
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="card w-[50vw]"
              >
                <Reviews restaurants={restaurants} user={user} row={clickedRow} />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      }
    </div>
  );
}

export default History;
