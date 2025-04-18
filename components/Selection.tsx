import { RestaurantDocument } from "@/app/api/restaurants/route";

interface SelectionProps {
  restaurant: RestaurantDocument;
}

function Selection({ restaurant }: SelectionProps) {
  return (
    <div className="card w-[50%] min-w-80" >
      <h3>Restaurant of the Week</h3>
      <div className="flex flex-col w-full gap-y-2">
        <span className="bg-gray-100 py-2 px-4 rounded-lg">{restaurant.restaurant}</span>
        <span className="bg-gray-100 py-2 px-4 rounded-lg">{restaurant.buyer}</span>
      </div>
    </div>
  );
}

export default Selection;
