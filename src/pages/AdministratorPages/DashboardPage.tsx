import DateRangeFilter from "@/components/AdministratorLayout/dashboardPage/DateRangeFilter";
import StatsDashboard from "@/components/AdministratorLayout/dashboardPage/StatsDashboard";
import TableBestSellingsProduct from "@/components/AdministratorLayout/dashboardPage/TableBestSellingsProduct";
import SkeletonStatsDashboard from "@/components/skeletons/SkeletonStatsDashboard";
import SkeletonTableBestSelling from "@/components/skeletons/SkeletonTableBestSelling";
import { fetchBestSellingProducts } from "@/services/best-selling-products";
import type { DateRange } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>(()=> {
    const to = new Date()
    const from = new Date()
    from.setDate(to.getDate() - 7)
    return { from, to }
  })

  const {data: bestSellingProducts = [], isLoading} = useQuery({
    queryKey: ['best-selling-products',dateRange.from.toISOString(),dateRange.to.toISOString()],
    queryFn: ()=> fetchBestSellingProducts(dateRange),
  })

  return (
    <>
      <section className="container mx-auto py-10 px-5 space-y-10">
        <DateRangeFilter onChange={setDateRange} />
        {isLoading
          ? <SkeletonStatsDashboard />
          : <StatsDashboard bestSellingProducts={bestSellingProducts} />
        }
        {isLoading 
          ? <SkeletonTableBestSelling />
          : <TableBestSellingsProduct data={bestSellingProducts} />
        }
      </section>
    </>
  )
}
