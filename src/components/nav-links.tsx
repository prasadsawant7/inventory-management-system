"use client";

import Link from "next/link";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground",
          )}
          key={link.title}
        >
          <link.icon className="h-4 w-4" />
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
