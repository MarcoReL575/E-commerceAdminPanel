import ProductCard from "@/components/DashboardLayout/Products/ProductCard"
import { useFavsProductsStore } from "@/store/useFavsProductsStore"
import { ShoppingCart } from "lucide-react"

export default function FavPage() {

  const products = useFavsProductsStore((state)=> state.products)

  return (
    <section className="container mx-auto w-full">
      <h1 className="text-2xl font-semibold">Mis Favortios</h1>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.length > 0 ? products.map((product)=> 
          <ProductCard key={product.id} producto={product} />
        )
        :<div className="container mx-auto flex items-center justify-center">
          <div className="bg-white w-xl p-4 rounded-xl flex flex-col items-center justify-center">
            <div className="flex items-center justify-center size-28 bg-gray-300 rounded-full">
              <ShoppingCart className="size-16" />
            </div>
            <span className="text-xl">Tu carrito esta vacío...</span>
          </div>
        </div>  }
      </div>
    </section>
  )
}
