import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReadProductsType } from "@/types/form.types";
import ViewProductCard from "@/components/products/view-product-card";

export default function ViewProduct({
  product,
}: {
  product: ReadProductsType;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-4 text-left text-2xl">
          {product.name}
        </DialogTitle>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
        <ViewProductCard product={product} />
      </DialogHeader>
    </DialogContent>
  );
}
