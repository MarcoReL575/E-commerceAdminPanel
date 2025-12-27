import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query";

export function useAdminStats(){
    const productsQuery = useQuery({
        queryKey: ['productosHome'],
        queryFn: productService,
        staleTime: 1000 * 60 * 5
    });

    return{
        productsQuery,
    }
}