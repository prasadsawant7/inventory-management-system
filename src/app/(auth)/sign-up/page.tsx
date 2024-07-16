import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import SignUpForm from "@/components/forms/signup-form";

export default async function SignUpPage() {
  const { user } = await validateRequest();

  if (user && user.role === UserType.ADMIN) {
    return redirect("/admin");
  }

  if (user && user.role === UserType.CUSTOMER) {
    return redirect("/customer");
  }

  return <SignUpForm />;
}
