import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTableProduct() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" /> {/* Create Product */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 gap-4 items-center"
            >
              {/* Imagen */}
              <Skeleton className="h-16 w-16 rounded-md" />

              {/* Nombre */}
              <Skeleton className="h-4 w-full" />

              {/* Precio */}
              <Skeleton className="h-4 w-20" />

              {/* Stock */}
              <Skeleton className="h-4 w-16" />

              {/* Categoría */}
              <Skeleton className="h-4 w-28" />

              {/* Estatus */}
              <Skeleton className="h-6 w-20 rounded-md" />

              {/* Fecha */}
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28" />
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
