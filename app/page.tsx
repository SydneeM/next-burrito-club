import RestaurantInput from "@/components/RestaurantInput";
import { RestaurantDocument } from "./api/restaurants/route";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/restaurants");
  const restaurants: RestaurantDocument[] = await data.json();
  console.log(restaurants);

  return (
   <RestaurantInput />
  );
}
