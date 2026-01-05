import { supabase } from "@/supabase/supabaseClient";
import type { OrdersShcema } from "@/types/auth";

export async function fetchOrders(): Promise<OrdersShcema[]>  {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            id,
            total,
            status,
            created_at,
            user_id,
            profiles:profiles!orders_user_id_fkey (
        username
      )
        `)
        .order("created_at", { ascending: false })
    if(error) throw error
    console.log(data)
    return data as unknown as OrdersShcema[]   
}
