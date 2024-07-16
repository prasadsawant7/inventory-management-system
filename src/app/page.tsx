import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";

export default async function RedirectPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (user && user.role === UserType.ADMIN) {
    return redirect("/admin");
  }

  if (user && user.role === UserType.CUSTOMER) {
    return redirect("/customer");
  }

  return null;
}
