import { ReadProductsType } from "@/types/form.types";
import { capitalize } from "@/utils";

export default function ViewProductCard({
  product,
}: {
  product: ReadProductsType;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 xs:text-left">
      <div className="col-span-2 grid gap-2">
        <div className="text-sm text-primary">Description</div>
        <div className="text-sm">{product.description}</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">HSN/SAC Code</div>
        <div className="text-sm">{product.hsnSacCode}</div>
      </div>

      <div className="grid gap-2">
        <div className="text-sm text-primary">Stock</div>
        <div className="text-sm">{product.stock}</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">Unit</div>
        <div className="text-sm">{capitalize(product.unit)}</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">Rate</div>
        <div className="text-sm">&#8377;{product.rate}</div>
      </div>

      <div className="col-span-3 grid gap-2">
        <div className="text-sm text-primary">Taxable Amount</div>
        <div className="text-sm">&#8377;{product.taxableAmount}</div>
      </div>

      <div className="col-span-3 mt-4 text-primary">
        GST Breakdown ({product.gst}%)
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">CGST</div>
        <div className="text-sm">{product.cGst}%</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">SGST</div>
        <div className="text-sm">{product.sGst}%</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">IGST</div>
        <div className="text-sm">{product.iGst}%</div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">Total GST</div>
        <div className="text-sm">&#8377;{product.totalGst}</div>
      </div>
      <div className="col-span-2 grid gap-2">
        <div className="text-sm text-primary">Amount</div>
        <div className="text-sm">&#8377;{product.amount}</div>
      </div>

      <div className="col-span-3 mt-4 text-primary">Dates:</div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">Created At</div>
        <div className="text-sm">
          {new Date(product.createdAt).toDateString()}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="text-sm text-primary">Updated At</div>
        <div className="text-sm">
          {new Date(product.updatedAt).toDateString()}
        </div>
      </div>
    </div>
  );
}
