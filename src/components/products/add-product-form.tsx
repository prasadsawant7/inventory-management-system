"use client";

import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { ProductInsertSchema } from "@/lib/schema";
import { AddProductFormType } from "@/types/form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Button } from "@/components/ui/button";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/form-custom-fields";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createProduct } from "@/actions/product.actions";

export default function AddProductForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isIGST, setIGST] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues: AddProductFormType = {
    name: "",
    description: "",
    hsnSacCode: "",
    stock: 0,
    unit: "",
    rate: 0,
    taxableAmount: 0,
    gst: 0,
    cGst: 0,
    sGst: 0,
    iGst: 0,
    totalGst: 0,
    amount: 0,
  };

  const form = useForm<z.infer<typeof ProductInsertSchema>>({
    resolver: zodResolver(ProductInsertSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ProductInsertSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProduct(values, isIGST).then((data) => {
        if (data.success) {
          setSuccess(data.success);

          form.reset();

          setTimeout(() => {
            router.push("/admin/products");
          }, 1000);
        }

        setError(data.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            id="name"
            name="name"
            label="Name"
            placeholder="Milk"
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            id="description"
            name="description"
            label="Description"
            placeholder="Amul Full Cream Cow Milk - 1ltr"
            disabled={isPending}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              id="hsn-sac-code"
              name="hsnSacCode"
              label="HSN/SAC Code"
              placeholder="0234234234"
              disabled={isPending}
            />
          </div>
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.NUMERIC_INPUT}
              id="stock"
              name="stock"
              label="Stock"
              type="text"
              inputMode="numeric"
              placeholder="Eg. 30, 40, etc."
              disabled={isPending}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              id="unit"
              name="unit"
              label="Unit"
              placeholder="Eg. kg, ltr, etc."
              disabled={isPending}
            />
          </div>
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DECIMAL_INPUT}
              id="rate"
              name="rate"
              label="Rate"
              type="number"
              inputMode="numeric"
              placeholder="Eg. 150, 189.99, etc."
              disabled={isPending}
            />
          </div>
        </div>

        {!isIGST ? (
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DECIMAL_INPUT}
              id="gst"
              name="gst"
              label="GST"
              type="number"
              inputMode="numeric"
              placeholder="Eg. 5, 18, etc."
              disabled={isPending}
              key="gst"
            />
          </div>
        ) : (
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DECIMAL_INPUT}
              id="igst"
              name="iGst"
              label="IGST"
              type="number"
              inputMode="numeric"
              placeholder="Eg. 5, 18, etc."
              disabled={isPending}
              key="igst"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <Switch
            checked={isIGST}
            onCheckedChange={() => setIGST((prev) => !prev)}
            id="gst-toggle"
          />
          <Label htmlFor="gst-toggle">IGST</Label>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
