import { validateRequest } from "@/lib/lucia";
import { UserType } from "@/types/form.types";
import { redirect } from "next/navigation";

import TotalRevenue from "@/components/dashboard/total-revenue";
import TotalCustomers from "@/components/dashboard/total-customers";
import TotalOrders from "@/components/dashboard/total-orders";
import TotalProducts from "@/components/dashboard/total-products";
import OrdersPreview from "@/components/dashboard/orders-preview";

export default async function Dashboard() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== UserType.ADMIN) {
    redirect("/");
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <TotalRevenue />
        <TotalCustomers />
        <TotalOrders />
        <TotalProducts />
      </div>

      <OrdersPreview />
    </>
  );
}
