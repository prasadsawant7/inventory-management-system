import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddProductForm from "@/components/products/add-product-form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function AddProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="!m-0 gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only font-medium text-primary-foreground sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Add Product To InvenTrack</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
          <AddProductForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
