import { UserType } from "@/types/form.types";
import { Home, Package, ShoppingCart, Users } from "lucide-react";

export const UserTypes: UserType[] = [UserType.CUSTOMER, UserType.ADMIN];

export const navLinks: NavLink[] = [
  {
    icon: Home,
    title: "Dashboard",
    href: "/admin",
  },
  {
    icon: ShoppingCart,
    title: "Orders",
    href: "/admin/orders",
  },
  {
    icon: Package,
    title: "Products",
    href: "/admin/products",
  },
  {
    icon: Users,
    title: "Customers",
    href: "/admin/customers",
  },
];
