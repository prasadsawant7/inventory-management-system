import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function TotalOrders() {
  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12,234</div>
        <p className="text-xs text-muted-foreground">Today&apos;s</p>
      </CardContent>
    </Card>
  );
}
