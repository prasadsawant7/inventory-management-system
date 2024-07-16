import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddProduct from "@/components/products/add-product";

export default function ProductCardHeader() {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-2">
        <CardTitle>Products</CardTitle>
        <CardDescription>Product available in your store.</CardDescription>
      </div>
      <AddProduct />
    </CardHeader>
  );
}
