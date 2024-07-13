"use client";

import { CardWrapperPropType } from "@/types/auth.ui.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import AuthHeader from "./AuthHeader";
import BackButton from "./BackButton";

const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperPropType) => {
  return (
    <Card className="shadow-md md:w-1/2 xl:w-1/4">
      <CardHeader>
        <AuthHeader
          label={label}
          title={title}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
