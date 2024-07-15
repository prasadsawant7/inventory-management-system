"use client";

import Link from "next/link";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema } from "@/lib/schema";
import { LoginFormType, UserType } from "@/types/form.types";
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
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";

import { UserTypes } from "@/constants";
import { capitalize } from "@/utils";
import { login } from "@/actions/auth.action";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const defaultValues: LoginFormType = {
    email: "",
    password: "",
    role: UserType.CUSTOMER,
  };

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                placeholder="Enter your password"
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
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button
            className="p-0"
            asChild
          >
            <Link
              href="/auth/register"
              className="text-yellow-400"
            >
              Sign up
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
