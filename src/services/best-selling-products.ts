import { supabase } from "@/supabase/supabaseClient";
import type { BestSellingProduct, DateRange } from "@/types/auth";

export async function fetchBestSellingProducts(range: DateRange) {
  const { from, to } = range;

  let query = supabase
    .from("best_selling_products")
    .select("*")
    .order("total_sold", { ascending: false });

  if (from instanceof Date) {
    query = query.gte("created_at", from.toISOString());
  }

  if (to instanceof Date) {
    query = query.lte("created_at", to.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error("[fetchBestSellingProducts]", error);
    throw error;
  }
  console.log(data)
  return (data ?? []) as BestSellingProduct[];
}
