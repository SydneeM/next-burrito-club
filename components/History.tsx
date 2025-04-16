"use client"

import { Button, Dialog, DialogPanel } from "@headlessui/react"
import { RestaurantDocument } from "@/app/api/restaurants/route";
import Ratings from "./Ratings";
import { useState } from "react";

interface HistoryProps {
  restaurants: RestaurantDocument[];
}

function History({ restaurants }: HistoryProps) {
  const [isOpen, setIsOpen] = useState(true);

  const open = () => {
    setIsOpen(true);
  }

  const close = () => {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col h-full">
      <h3>Restaurant History</h3>
      <div className="grid grid-cols-5 text-start">
        <h4>Place</h4>
        <h4>Buyer</h4>
        <h4>Date</h4>
        <h4>Rating</h4>
        <h4>Add A Review</h4>
      </div>
      {restaurants.map((restaurant) => {
        const ratings = restaurant.ratings;
        const avgRating = ratings.length > 0 ? Math.round(ratings.reduce((a, b) => a + b) / ratings.length) : 0;
        return (
          <div key={`${restaurant.restaurant}-${restaurant.time}`}>
            <div
              className="grid grid-cols-5 text-start"
            >
              <div className="">{restaurant.restaurant}</div>
              <div className="">{restaurant.buyer}</div>
              <div className="">{new Date(restaurant.time).toLocaleDateString()}</div>
              <div className="">
                <Ratings editable={false} initialRating={avgRating} />
              </div>
              <div className="">
                <Button
                  onClick={open}
                  className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Open dialog
                </Button>
              </div>
            </div>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                  >
                    <div>Test</div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
        )
      })}
    </div>
  );
}

export default History;
