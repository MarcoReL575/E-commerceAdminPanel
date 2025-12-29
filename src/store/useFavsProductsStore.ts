import type { ProductsInCart } from '@/types/auth'
import { toast } from 'react-toastify';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
    products: ProductsInCart[];
    toggleToFav: (product: ProductsInCart) => void;
}

export const useFavsProductsStore = create<BearState>()(
    devtools(
        persist(
            (set, get) => ({
                products: [],
                toggleToFav: (product: ProductsInCart)=> {
                    const products = get().products 
                    const isLiked = products.find((productCart)=> productCart.id === product.id)
                    if(isLiked) {
                        const newProducts = products.filter((productCart)=> productCart.id !== product.id)
                        set({ products: newProducts })
                        toast.success('Eliminado de Favoritos')
                        return
                    }
                    const newProduct = {
                        ...product,
                        isLiked: true
                    }
                    set((state)=> ({ products: [...state.products, newProduct] }))
                    toast.success('Agregado a Favoritos')
                },
            }),
      { name: 'favsEcommerceStore' },
    ),
  ),
)
