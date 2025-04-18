import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const storedUser = cookieStore.get("user");

  if (storedUser !== undefined) {
    redirect("/dashboard");
  }

  async function handleClick(formData: FormData) {
    "use server";
    const newUser = formData.get("user");
    if (newUser) {
      const cookieStore = await cookies();
      cookieStore.set("user", String(newUser));
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col w-fit self-center gap-y-4 my-auto">
        <h1 className="">Join the Club</h1>
        <form
          className="flex flex-col gap-y-4"
          action={handleClick}
        >
          <input
            className="border-1 border-gray-200 py-3 px-4 rounded-lg focus:outline-none bg-white shadow"
            autoComplete="off"
            name="user"
            placeholder="Username"
          />
          <button
            className="py-3"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
