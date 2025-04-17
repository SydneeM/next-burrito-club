import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RestaurantDocument } from "@/app/api/restaurants/route";
import RestaurantInput from "@/components/RestaurantInput";
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
    <div>
      <span>Hello {user.value}</span>
      <RestaurantInput />
      <History restaurants={restaurants} user={user.value} />
    </div>
  );
}
