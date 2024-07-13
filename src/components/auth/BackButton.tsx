"use client";

import { BackButtonPropType } from "@/types/auth.ui.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BackButton = ({ label, href }: BackButtonPropType) => {
  return (
    <Button
      variant="link"
      className="w-full font-normal"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
