import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const storedUser = cookieStore.get("user");

  if (storedUser !== undefined) {
    redirect("/home");
  }

  async function handleClick(formData: FormData) {
    "use server";
    const newUser = formData.get("user");
    if (newUser) {
      const cookieStore = await cookies();
      cookieStore.set("user", String(newUser));
      redirect("/home");
    }
  }

  return (
    <form action={handleClick}>
      <input name="user" defaultValue="Username" />
      <button type="submit">Enter</button>
    </form>
  )
}
