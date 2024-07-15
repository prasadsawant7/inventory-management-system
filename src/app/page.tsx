import { logout } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h1 className="text-3xl">Protected Route</h1>
      <h1 className="text-2xl">Home</h1>
      <form action={logout}>
        <Button type="submit">Logout</Button>
      </form>
    </main>
  );
}
