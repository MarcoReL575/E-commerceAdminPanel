import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrdersTable() {
  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-44 rounded-md" />
      </CardHeader>

      {/* Table */}
      <CardContent>
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>

          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-4 items-center">
              <Skeleton className="h-5 w-full" /> {/* Cliente */}
              <Skeleton className="h-5 w-full" /> {/* Fecha */}
              <Skeleton className="h-5 w-24" />   {/* Total */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-20 rounded-md" /> {/* Status */}
                <Skeleton className="h-8 w-8 rounded-md" />  {/* Edit */}
                <Skeleton className="h-8 w-8 rounded-md" />  {/* Info */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}
