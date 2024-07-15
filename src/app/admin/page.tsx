import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserType.ADMIN) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-4xl">Admin Panel</h1>
      <p>You shouldn&apos;t see it unless you are admin</p>
    </>
  );
}
