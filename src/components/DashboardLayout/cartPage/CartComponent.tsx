import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductsInCart } from "@/types/auth";
import ButtonAddQuantity from "./ButtonAddQuantity";
import { TrashIcon } from "lucide-react";
import { useProductsStore } from "@/store/useProductsStore";
import { toast } from "react-toastify";


export default function CartComponent({product}:{product: ProductsInCart}) {

    const deleteProduct = useProductsStore((state)=> state.deleteProduct)
    const handleDeleteProduct = ()=> {
        deleteProduct(product.id)
        toast.success('Producto Eliminado')
    }

  return (
    <Card className="grid grid-cols-5 w-full bg-white h-40 p-1">
        <CardHeader className="relative col-span-2 w-full overflow-hidden rounded-lg">
            <img src={product.url_image} alt={product.title} className="absolute w-full h-full object-cover " />
        </CardHeader>
        <CardContent className="col-span-2 flex flex-col items-start justify-between py-4">
            <CardTitle>{product.title}</CardTitle>
            <CardDescription className="text-md">${product.price}</CardDescription>
            <div className="flex space-x-4 items-center">
                <ButtonAddQuantity operation='resta' product={product} />
                <span>{product.cantidad}</span>
                <ButtonAddQuantity operation='suma' product={product} />
           </div>
        </CardContent>
        <CardFooter className=" flex items-end justify-end py-4">
            <TrashIcon 
                className="cursor-pointer text-red-500 hover:scale-125 hover:text-red-400 transition-all duration-300 ease-in " 
                onClick={handleDeleteProduct}
            />
        </CardFooter>
    </Card>
  )
}
