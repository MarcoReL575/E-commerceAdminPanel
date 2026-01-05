import { supabase } from "@/supabase/supabaseClient";
import type { OrderItemsSchema } from "@/types/auth";

export async function fetchOrderItems(orderId: string) {
    try {
        const { data, error } = await supabase
            .from('order_items')
            .select(`
                id,
                quantity,
                price,
                products (
                    id,
                    title,
                    url_image
                ) 
            `)
            .eq('order_id', orderId)
        if(error) console.log(error)
        console.log(data)
        return data as unknown as OrderItemsSchema[]
    } catch (error) {
        console.log(error)
    }
}