import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  async function handleClick(formData: any) {
    "use server";
    const user = formData.get("user");
    const cookieStore = await cookies();
    cookieStore.set("user", user);
    redirect("/home");
  }

  return (
    <form action={handleClick}>
      <input name="user" defaultValue="Username" />
      <button type="submit">Enter</button>
    </form>
  )
}
