import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import { redirect } from "next/navigation";

export default async function Customers() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserType.ADMIN) {
    redirect("/");
  }

  return <div>Customers</div>;
}
