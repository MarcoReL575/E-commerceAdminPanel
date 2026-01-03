import { supabase } from "@/supabase/supabaseClient";

export async  function editStatus(option: string, orderId: string){
    const { error } = await supabase
        .from('orders')
        .update({ status: option })
        .eq('id', orderId)
    console.log(error)
}