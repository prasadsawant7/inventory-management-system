import { fetchAllProducts } from "@/actions/product.actions";
import ProductRow from "@/components/products/product-row";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProductList() {
  const products = await fetchAllProducts();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Stock</TableHead>
          <TableHead className="hidden sm:table-cell">Unit</TableHead>
          <TableHead className="hidden sm:table-cell">Rate</TableHead>
          <TableHead className="hidden md:table-cell">Taxable Amount</TableHead>
          <TableHead className="hidden sm:table-cell">GST</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
      </TableBody>
    </Table>
  );
}
