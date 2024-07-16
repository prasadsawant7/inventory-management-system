"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/auth.actions";

export default function LogoutButton() {
  return <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>;
}
