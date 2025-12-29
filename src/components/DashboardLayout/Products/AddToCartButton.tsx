import { Button } from '@/components/ui/button'
import { useProductsStore } from '@/store/useProductsStore'
import type { ProductsInCart } from '@/types/auth'
import { toast } from 'react-toastify'

export default function AddToCartButton({product}: {product: ProductsInCart}) {
    const addToCart = useProductsStore((state)=> state.addProduct)

    const handleAddProductToCart = ()=> {
        addToCart(product)
        toast.success('Producto Agregado')
    }

  return (
    <Button 
        className='cursor-pointer' 
        onClick={handleAddProductToCart}
    >
        Agregar al Carrito
    </Button>
  )
}
