import ProductCard from "@/components/DashboardLayout/Products/ProductCard";
import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query"

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['productosHome'],
    queryFn: productService,
    staleTime: 1000 * 60 * 5
  });

  if(isLoading) return <div>Cargando...</div> 
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {data ? 
      data.map((producto)=> (
        <ProductCard key={producto.id} producto={producto} />
      ))
      :<div>No hay productos</div>
      }  
    </section>
  )
}
