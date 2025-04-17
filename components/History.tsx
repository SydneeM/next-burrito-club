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
    <div className="flex flex-col h-full">
      <h3>Restaurant History</h3>
      <div className="grid grid-cols-5 text-start">
        <h4>Place</h4>
        <h4>Buyer</h4>
        <h4>Date</h4>
        <h4>Rating</h4>
        <h4>Add A Review</h4>
      </div>
      {restaurants.map((restaurant, index) => (
        <div
          key={`${restaurant.restaurant}-${restaurant.time}`}
          className="grid grid-cols-5 text-start"
        >
          <div className="">{restaurant.restaurant}</div>
          <div className="">{restaurant.buyer}</div>
          <div className="">{new Date(restaurant.time).toLocaleDateString()}</div>
          <div className="">
            <Ratings editable={false} rating={average(restaurant.ratings)} />
          </div>
          <div className="">
            <Button
              onClick={() => open(index)}
              className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Open dialog
            </Button>
          </div>
        </div>
      ))}
      {clickedRow !== null &&
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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
