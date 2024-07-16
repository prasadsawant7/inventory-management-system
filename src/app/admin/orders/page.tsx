import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import { redirect } from "next/navigation";

export default async function Orders() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserType.ADMIN) {
    redirect("/");
  }

  return <div>Orders</div>;
}
