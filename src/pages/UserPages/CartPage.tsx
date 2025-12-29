import CartComponent from "@/components/DashboardLayout/cartPage/CartComponent"
import TotalComponent from "@/components/DashboardLayout/cartPage/TotalComponent"
import { useProductsStore } from "@/store/useProductsStore"

export default function CartPage() {

  const productsCart = useProductsStore((state)=> state.productsCart)

  return (
    <section className="w-full">
      <h1 className="text-4xl font-semibold pb-4">Carrtio de Compras</h1>
      <section className="flex flex-col md:grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          {productsCart ? productsCart.map((product)=> (
            <CartComponent key={product.id} product={product} />
          ))
          : <div className="text-xl font-semibold text-center">El carrito esta vacío...</div>
          }
        </div>
        <TotalComponent />
      </section>
    </section>
  )
}
