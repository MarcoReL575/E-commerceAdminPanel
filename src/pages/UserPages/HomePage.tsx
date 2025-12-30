import Filters from "@/components/DashboardLayout/filters/Filters";
import SearchFilter from "@/components/DashboardLayout/filters/SearchFilter";
import { PaginationComponent } from "@/components/DashboardLayout/pagination/PaginationComponent";
import ProductCard from "@/components/DashboardLayout/Products/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/services/product-service";
import { useFiltersStore } from "@/store/useFiltersStore";
import type { ProductsInCart } from "@/types/auth";
import { useQuery } from "@tanstack/react-query"
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";

const PAGE_SIZE = 12

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const category = useFiltersStore((state)=> state.category) 
  const minPrice = useFiltersStore((state)=> state.minPrice) 
  const maxPrice = useFiltersStore((state)=> state.maxPrice) 
  const searchInput = useFiltersStore((state)=> state.searchInput)
  
  useEffect(() => {
    setPage(1)
  }, [category, minPrice, maxPrice, searchInput])

  const { data, isLoading } = useQuery({
    queryKey: ['productosHome', page, category, minPrice, maxPrice, searchInput],
    queryFn: ()=> fetchProducts({page, PAGE_SIZE, category, minPrice, maxPrice, searchInput}),
    staleTime: 1000 * 60 * 5
  }); 
  
  const totalPages = Math.ceil((data?.count ?? 0) / PAGE_SIZE)
  
  const handleFilter =() => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="flex flex-col space-y-10 w-full">
      <section className="container mx-auto grid grid-cols-4 max-w-4xl">
        <SearchFilter />
        <div className="flex items-center pl-5">
          <Button className="w-full" onClick={handleFilter}>
            <FilterIcon />
            Filtros
          </Button>
        </div>
      </section>
      {showFilters && 
        <section className="space-y-2 bg-white p-8 rounded-xl shadow-lg">
          <Filters />
        </section>
      }
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {isLoading ? <div>Cargando...</div>   
        : data?.data?.length ? 
        data.data.map((producto)=> {
            const productToCart: ProductsInCart = {
              ...producto,
              cantidad: 1,
              isLiked: false
            }
          return <ProductCard key={producto.id} producto={productToCart} />
        })
        :<div className="text-center text-2xl col-span-4">No hay productos...</div>
        }  
      </section>
      <section>
        <PaginationComponent currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      </section>
    </div>
  )
}
