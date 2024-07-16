"use server";

import db from "@/lib/db";
import { products } from "@/lib/db/schema";
import { ProductInsertSchema } from "@/lib/schema";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

export const createProduct = async (
  values: z.infer<typeof ProductInsertSchema>,
  isIGST: boolean,
) => {
  try {
    const validatedFields = ProductInsertSchema.safeParse(values);

    if (!validatedFields.success) {
      throw new Error("Invalid fields!");
    }

    const { name, description, hsnSacCode, unit, gst, iGst, rate, stock } =
      validatedFields.data;

    const GST = !isIGST ? gst : iGst;
    const CGST = !isIGST && gst !== 0 ? gst / 2 : 0;
    const SGST = !isIGST && gst !== 0 ? gst / 2 : 0;
    const IGST = isIGST ? iGst : 0;
    const taxableAmount = rate * stock;
    const totalGst = taxableAmount * (GST / 100);
    const amount = taxableAmount + totalGst;

    await db
      .insert(products)
      .values({
        name,
        description,
        hsnSacCode,
        stock,
        unit,
        rate,
        taxableAmount,
        gst: GST,
        cGst: CGST,
        sGst: SGST,
        iGst: IGST,
        totalGst,
        amount,
      })
      .returning({
        id: products.id,
        name: products.name,
        description: products.description,
        hsnSacCode: products.hsnSacCode,
        stock: products.stock,
        unit: products.unit,
        rate: products.rate,
        taxableAmount: products.taxableAmount,
        gst: products.gst,
        cGst: products.cGst,
        sGst: products.sGst,
        iGst: products.iGst,
        totalGst: products.totalGst,
        amount: products.amount,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      });

    return { success: "Product created successfully!" };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const fetchAllProducts = async () => {
  try {
    const data = await db
      .select()
      .from(products)
      .orderBy(asc(products.updatedAt));

    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await db.delete(products).where(eq(products.id, id));
    const updatedProducts = await fetchAllProducts();
    return updatedProducts;
  } catch (error: any) {
    return { error: error?.message };
  }
};
