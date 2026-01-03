import { supabase } from "@/supabase/supabaseClient";
import type { FormCheckoutProducts, ProductsInCart } from "@/types/auth";
import type { User } from "@supabase/supabase-js";

interface AddresCheckoutProps {
    addres: FormCheckoutProducts;
    productsCart: ProductsInCart[];
    user: User | null;
    totalOrder: number;
}

export async function addresCheckout({ addres, productsCart, user, totalOrder }: AddresCheckoutProps) {

    try {
        const {error} = await supabase
            .from('shipping_addresses')
            .insert({
                user_id: user?.id,
                full_name: addres.name,
                address: addres.street,
                city: addres.city,
                state: addres.state,
                postal_code: addres.postalCode,
                country: addres.country,
                phone: addres.phone
            });
        if(error) throw new Error('Error al guardar la información')

        const {data: orderData, error: errorOrders} = await supabase
            .from('orders')
            .insert({
                user_id: user?.id,
                total:  totalOrder,
                status: 'pendiente'
            })
            .select()
            .single()
        if(errorOrders) throw new Error('Error al generar la orden')

        const orderItems = productsCart.map((product: ProductsInCart)=> ({
            order_id: orderData?.id,
            product_id: product.id,
            quantity: product.cantidad,
            price: product.price
        }))

        const {error: itemsError} = await supabase 
            .from('order_items')
            .insert(orderItems)
        if(itemsError) throw new Error('Error al generar la orden')

        const { error: stockError } = await supabase.rpc(
            "decrease_product_stock",
            { p_order_id: orderData.id }
        )
        if(stockError) throw new Error('Error al generar la orden')
            
        return true
    } catch (error) {
        throw new Error('Error al realizar compra')
    }   
}