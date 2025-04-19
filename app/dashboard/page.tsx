import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RestaurantDocument } from "@/app/api/restaurants/route";
import clientPromise from "@/utils/connect";
import Input from "@/components/Input";
import Selection from "@/components/Selection";
import History from "@/components/History";

export default async function Dashboard() {
  const client = await clientPromise;
  const findResult = client.db("next_burrito_club").collection("restaurants").find();
  const restaurants = await findResult.toArray();
  const sortedRestaurants: RestaurantDocument[] = JSON.parse(JSON.stringify(restaurants.sort((a, b) => b.time - a.time)));

  const cookieStore = await cookies();
  const user = cookieStore.get("burrito-club-user");

  if (user === undefined) {
    redirect("/");
  }

  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-col w-[65vw] gap-y-8 p-10">
        <h1>Burrito Club</h1>
        <div className="flex flex-row gap-x-8 w-full">
          <Selection restaurant={sortedRestaurants[0] || []} />
          <Input />
        </div>
        <History restaurants={sortedRestaurants} user={user.value} />
      </div>
    </div>
  );
}
