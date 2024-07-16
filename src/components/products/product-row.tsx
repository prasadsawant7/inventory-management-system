"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewProduct from "@/components/products/view-product";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReadProductsType } from "@/types/form.types";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/utils";
import { MoreHorizontal, View } from "lucide-react";
import { deleteProduct } from "@/actions/product.actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ProductRow({ product }: { product: ReadProductsType }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    name,
    description,
    stock,
    unit,
    rate,
    taxableAmount,
    totalGst,
    amount,
  } = product;

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(product.id);
      router.refresh();
    });
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{name}</div>
        {description && (
          <div className="hidden text-sm text-muted-foreground sm:block">
            {description}
          </div>
        )}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{stock}</TableCell>
      <TableCell className="hidden sm:table-cell">{capitalize(unit)}</TableCell>
      <TableCell className="hidden sm:table-cell">&#8377;{rate}</TableCell>
      <TableCell className="hidden md:table-cell">
        &#8377;{taxableAmount}
      </TableCell>
      <TableCell className="hidden sm:table-cell">&#8377;{totalGst}</TableCell>
      <TableCell>&#8377;{amount}</TableCell>
      <TableCell>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                disabled={isPending}
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={isPending}
                >
                  View
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem
                className="cursor-pointer"
                disabled={isPending}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ViewProduct product={product} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
