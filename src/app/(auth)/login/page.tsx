import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import LoginForm from "@/components/forms/login-form";

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user && user.role === UserType.ADMIN) {
    return redirect("/admin");
  }

  if (user && user.role === UserType.CUSTOMER) {
    return redirect("/customer");
  }

  return <LoginForm />;
}
