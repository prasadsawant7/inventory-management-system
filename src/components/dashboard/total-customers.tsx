import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function TotalCustomers() {
  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">2350</div>
        <p className="text-xs text-muted-foreground">Offline + Online</p>
      </CardContent>
    </Card>
  );
}
