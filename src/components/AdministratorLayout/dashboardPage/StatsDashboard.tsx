import OrderStats from "../orders/OrderStats";
import { CircleDollarSignIcon, ClipboardListIcon, ShoppingBagIcon, TrendingUpIcon } from "lucide-react";
import { useStatsDashboard } from "@/hooks/useStatsDashboard";
import { getBestSellingStats } from "@/helpers/fetchBestSellingsStats";
import type { BestSellingProduct } from "@/types/auth";

export default function StatsDashboard({bestSellingProducts}: {bestSellingProducts: BestSellingProduct[]}) {

  const { orders, products } = useStatsDashboard()

  const bestSellingStats = bestSellingProducts
  ? getBestSellingStats(bestSellingProducts)
  : null
  
  const totalProducts = products?.length
  const totalOrders = orders?.length

  return (
    <section className="grid grid-cols-4 gap-5">
      <OrderStats Icon={TrendingUpIcon} stat={bestSellingStats?.totalUnitsSold} title="Productos Vendidos" />
      <OrderStats Icon={CircleDollarSignIcon} stat={`$${bestSellingStats?.totalRevenue}`} title="Ingresos Totales" />
      <OrderStats Icon={ShoppingBagIcon} stat={totalProducts} title="Total de Productos" />
      <OrderStats Icon={ClipboardListIcon} stat={totalOrders} title="Total de Órdenes" />
    </section>
  )
}
