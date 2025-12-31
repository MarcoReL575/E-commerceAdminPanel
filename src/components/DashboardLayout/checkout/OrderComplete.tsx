import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useProductsStore } from "@/store/useProductsStore";

export default function OrderComplete() {

    const productsCart = useProductsStore((state)=> state.productsCart)
    const subtotal = useProductsStore((state)=> state.getTotal)
    const desc = 0
    const sub = subtotal()
    const total = sub -desc

  return (
    <Card className="p-5">
        <CardTitle className="text-xl">
            OrderCompleta:
        </CardTitle>
        <hr />
        <CardContent className="flex flex-col space-y-2">
            {productsCart.length && productsCart.map((product)=> (
                <div key={product.id} className="flex items-center justify-between text-gray-400" >
                    <span>{product.title}</span>
                    <span>${product.price}</span>
                </div>
            ))}
            <hr />
            <div className="text-gray-500 text-lg">
                <p className="flex items-center justify-between">Subtotal: <span>${sub}</span></p>
                <p className="flex items-center justify-between">Descuento: <span>${desc}</span></p>
            </div>
        </CardContent>
        <CardFooter className="text-gray-600 font-semibold text-xl w-full">
            <p className="flex items-center justify-end gap-x-4 w-full">Total: <span>${total}</span></p>
        </CardFooter>
        
    </Card>
  )
}
