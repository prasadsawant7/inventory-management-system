import Link from "next/link";
import { Menu, Package2 } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MobileNavLinks from "./mobile-nav-links";

export default function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col"
      >
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>

        <SheetTitle>
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only xs:not-sr-only">InvenTrack</span>
          </Link>
        </SheetTitle>

        <MobileNavLinks />
      </SheetContent>
    </Sheet>
  );
}
