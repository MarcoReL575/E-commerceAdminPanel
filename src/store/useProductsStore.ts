import type { ProductsInCart } from '@/types/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProductsStoreProps {
    productsCart: ProductsInCart[];
    addProduct: (product: ProductsInCart) => void;
    addQuantity: (operation: string, product: ProductsInCart) => void;
    deleteProduct: (productId: ProductsInCart['id']) => void;
    getTotal: () => number
}

export const useProductsStore = create<ProductsStoreProps>()(
    devtools(
        persist(
            (set, get) => ({
                productsCart: [],
                addProduct: (product: ProductsInCart)=> {
                    set((state)=> {
                        const productExist = state.productsCart.find((productCart)=> productCart.id === product.id)
                        if(productExist) {
                            return {
                                productsCart: state.productsCart.map((pro)=> pro.id === product.id
                                ? {...pro, cantidad: pro.cantidad +1 }
                                : pro)
                            }
                        };
                        return {
                            productsCart: [...state.productsCart, product]
                        }
                    });
                },
                addQuantity: (operation: string, product: ProductsInCart)=> {
                    const lmitMax = product.stock
                    if(operation === 'suma' && product.cantidad < lmitMax){
                        set({ productsCart: get().productsCart.map((productCart)=> productCart.id === product.id 
                            ? {...productCart, cantidad: productCart.cantidad + 1}
                            : productCart
                        )});
                        return
                    }
                    else if(operation === 'resta' && product.cantidad >1){
                        set({ productsCart: get().productsCart.map((productCart)=> productCart.id === product.id 
                            ? {...productCart, cantidad: productCart.cantidad - 1}
                            : productCart
                        )});
                        return
                    }
                },
                deleteProduct: (productId: ProductsInCart['id'])=> {
                    const newProducts = get().productsCart.filter((productCart)=> productCart.id !== productId)
                    set({ productsCart: newProducts })
                },
                getTotal: ()=> {
                    const products = get().productsCart
                    return products.reduce((sum, item)=> sum + item.price * item.cantidad, 0);
                }, 
            }),
        { name: 'e-commerceProducts' },
        ),
    ),
)
