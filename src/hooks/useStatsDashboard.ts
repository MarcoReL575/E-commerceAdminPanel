import { fetchOrders } from "@/services/orders-service";
import { productService } from "@/services/product-service";
import { useQuery } from "@tanstack/react-query";

export function useStatsDashboard() {

    const {data: products, isLoading, isError} = useQuery({
        queryKey: ['productslength'],
        queryFn: productService,
        staleTime: 1000 * 60 * 15 //timpo de 15min
    });
    
    const {data: orders} = useQuery({
        queryKey: ['totalOrders'],
        queryFn: fetchOrders,
        staleTime: 1000 * 60 * 15 //timpo de 15min
    });

  return {
    products,
    orders,
  }
}
