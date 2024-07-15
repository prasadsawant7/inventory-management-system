import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/lucia";
import SignUpForm from "@/components/forms/signup-form";

export default async function SignUpPage() {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/");
  }

  return <SignUpForm />;
}
