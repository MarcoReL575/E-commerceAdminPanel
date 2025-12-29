import { PaginationComponent } from "@/components/DashboardLayout/pagination/PaginationComponent";
import ProductCard from "@/components/DashboardLayout/Products/ProductCard";
import { fetchProducts } from "@/services/product-service";
import type { ProductsInCart } from "@/types/auth";
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

const PAGE_SIZE = 12

export default function HomePage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['productosHome', page],
    queryFn: ()=> fetchProducts(page -1, PAGE_SIZE),
    staleTime: 1000 * 60 * 5
  }); 
 
  if(isLoading) return <div>Cargando...</div> 
  const totalPages = Math.ceil((data?.count ?? 0) / PAGE_SIZE)

  return (
    <div className="flex flex-col space-y-10">
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data?.data.length ? 
        data.data.map((producto)=> {
            const productToCart: ProductsInCart = {
              ...producto,
              cantidad: 1,
              isLiked: false
            }
          return <ProductCard key={producto.id} producto={productToCart} />
        })
        :<div>No hay productos</div>
        }  
      </section>
      <section>
        <PaginationComponent currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      </section>
    </div>
  )
}
