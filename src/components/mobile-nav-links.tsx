"use client";

import Link from "next/link";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { Package2 } from "lucide-react";

export default function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 text-lg font-medium">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          className={cn(
            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
            pathname === link.href
              ? "bg-muted text-foreground"
              : "text-muted-foreground",
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
