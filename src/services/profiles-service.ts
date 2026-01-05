import { supabase } from "@/supabase/supabaseClient";
import type { ProfileStats } from "@/types/auth";

export async function fetchProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
    if (error) throw new Error(error.message)
    console.log(data)
    return data as ProfileStats[]
}