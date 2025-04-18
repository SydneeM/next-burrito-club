import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RestaurantDocument } from "@/app/api/restaurants/route";
import Input from "@/components/Input";
import Selection from "@/components/Selection";
import History from "@/components/History";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/restaurants");
  const restaurants: RestaurantDocument[] = await response.json();

  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (user === undefined) {
    redirect("/");
  }

  return (
    <div className="flex flex-row justify-center h-screen">
      {/* <span>Hello {user.value}</span> */}
      <div className="flex flex-col w-[65vw] gap-y-4 p-10">
        <h1>Burrito Club</h1>
        <div className="flex flex-row gap-x-4 w-full">
          <Selection restaurant={restaurants[0]} />
          <Input />
        </div>
        <History restaurants={restaurants} user={user.value} />
      </div>
    </div>
  );
}
