import TableProduct from "@/components/AdministratorLayout/charts/TableProduct";
import SkeletonTableProduct from "@/components/skeletons/SkeletonTableProduct";
import { useAdminStats } from "@/hooks/useAdminStats";

export default function ProductsPage() {

  const { productsQuery } = useAdminStats()
  const {data: products =[], isLoading} = productsQuery

  return (
    <section className="container mx-auto py-10 px-5">
      {isLoading
        ? <SkeletonTableProduct />
        : <TableProduct products={products} />
      }
    </section>
  )
}
