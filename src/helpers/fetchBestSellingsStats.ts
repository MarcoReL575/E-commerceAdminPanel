import type { BestSellingProducts } from "@/types/auth";

export function getBestSellingStats(products : BestSellingProducts[]) {
    const totalUnitsSold = products.reduce((acc, product)=> acc + product.total_sold, 0);
    const totalRevenue = products.reduce((acc, product)=> acc + product.total_revenue, 0);
    return {
        totalUnitsSold,
        totalRevenue
    }
}