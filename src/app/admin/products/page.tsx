import { redirect } from "next/navigation";
import ProductCardHeader from "@/components/products/card-header";
import { Card, CardContent } from "@/components/ui/card";
import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import { Suspense } from "react";
import ProductList from "@/components/products/product-list";

export default async function Products() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserType.ADMIN) {
    redirect("/");
  }

  return (
    <Card>
      <ProductCardHeader />
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
