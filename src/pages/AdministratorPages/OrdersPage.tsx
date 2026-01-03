import OrdersTable from "@/components/AdministratorLayout/orders/OrdersTable"
import OrderStats from "@/components/AdministratorLayout/orders/OrderStats"
import { fetchOrders } from "@/services/orders-service"
import { useQuery } from "@tanstack/react-query"
import { CheckCircleIcon, ClipboardListIcon, Clock1Icon, ClockCheckIcon } from "lucide-react";
import { useMemo } from "react";

export default function OrdersPage() {

  const { data: orderList, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5
  })
  
  const stats = ()=> useMemo(()=> {
    if(!orderList){ 
      return {
        total: 0,
        pending: 0,
        completed: 0,
        inProccess: 0
      }
    }

    return {
      total: orderList?.length,
      pending: orderList?.filter((order)=> order.status === 'pendiente').length,
      completed: orderList?.filter((order)=> order.status === 'completado').length,
      inProccess: orderList?.filter((order)=> order.status === 'proceso').length
    }
  }, [orderList])

  const orderStats = stats()

  if (isLoading) return <p>Cargando órdenes...</p>
  if (isError) return <p>Error al cargar órdenes</p>

  return (
    <section className="container mx-auto p-10 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <OrderStats title='órdenes totales'  stat={orderStats.total} Icon={ClipboardListIcon}/>
        <OrderStats title="pendientes" stat={orderStats.pending} Icon={Clock1Icon}/>
        <OrderStats title="en proceso" stat={orderStats.inProccess} Icon={ClockCheckIcon}/>
        <OrderStats title="completadas" stat={orderStats.completed} Icon={CheckCircleIcon}/>
      </div>
      <OrdersTable orderList={orderList} />
    </section>
  )
}
