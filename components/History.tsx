import { RestaurantDocument } from "@/app/api/restaurants/route";
import Ratings from "./Ratings";

interface HistoryProps {
  restaurants: RestaurantDocument[];
}

function History({ restaurants }: HistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <h3>Restaurant History</h3>
      <div className="grid grid-cols-4 text-start">
        <h4>Place</h4>
        <h4>Buyer</h4>
        <h4>Date</h4>
        <h4>Rating</h4>
      </div>
      {restaurants.map((restaurant) => {
        const ratings = restaurant.ratings;
        const avgRating = ratings.length > 0 ? Math.round(ratings.reduce((a, b) => a + b) / ratings.length) : 0;
        return (
          <div
            key={`${restaurant.restaurant}-${restaurant.time}`}
            className="grid grid-cols-4 text-start"
          >
            <div className="">{restaurant.restaurant}</div>
            <div className="">{restaurant.buyer}</div>
            <div className="">{new Date(restaurant.time).toLocaleDateString()}</div>
            <div className="">
              <Ratings editable={false} initialRating={avgRating} />
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default History;
