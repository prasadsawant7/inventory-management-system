"use client";

import Link from "next/link";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormType, UserType } from "@/types/form.types";
import { registerFormSchema } from "@/schema";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/form-custom-fields";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";

import { UserTypes } from "@/constants";
import { capitalize } from "@/utils";
import { signUp } from "@/actions/auth.action";

export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const defaultValues: RegisterFormType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserType.CUSTOMER,
  };

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUp(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  id="first-name"
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  disabled={isPending}
                />
              </div>
              <div className="grid gap-2">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  id="last-name"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                id="email"
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password must be 8 characters long"
                disabled={isPending}
              />
            </div>
            <div className="grid gap-2">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                id="user-type"
                name="role"
                label="User Type"
                placeholder="Select your user type"
                disabled={isPending}
              >
                {UserTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {capitalize(type)}
                  </SelectItem>
                ))}
              </CustomFormField>
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              Create an account
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0"
            asChild
          >
            <Link
              href="/auth/login"
              className="text-yellow-400"
            >
              Login
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
