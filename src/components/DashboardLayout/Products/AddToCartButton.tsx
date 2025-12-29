import { Button } from '@/components/ui/button'
import { useProductsStore } from '@/store/useProductsStore'
import type { ProductsInCart } from '@/types/auth'
import { ShoppingCartIcon } from 'lucide-react'
import { toast } from 'react-toastify'

export default function AddToCartButton({product}: {product: ProductsInCart}) {
    const addToCart = useProductsStore((state)=> state.addProduct)

    const handleAddProductToCart = ()=> {
        addToCart(product)
        toast.success('Producto Agregado')
    }

  return (
    <Button 
        className='cursor-pointer w-full' 
        onClick={handleAddProductToCart}
    >
      <ShoppingCartIcon />
      Agregar al Carrito
    </Button>
  )
}
