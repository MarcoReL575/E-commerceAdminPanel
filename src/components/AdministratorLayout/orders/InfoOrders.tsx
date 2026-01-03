import { Button } from "@/components/ui/button";
import { fetchOrderItems } from "@/services/fetch-order-items";
import type { OrderItemsSchema } from "@/types/auth";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function InfoOrders({ orderId }: {orderId: string | undefined}) {
    let [isOpen, setIsOpen] = useState(false)
    const [orderInfo, setOrderInfo] = useState<OrderItemsSchema[] | undefined>([])
    
    const handleGetInfoOrder = async()=> {
        if(!orderId) return 
        const order = await fetchOrderItems(orderId)
        setOrderInfo(order)
        setIsOpen(!isOpen)
    }

  return (
    <>
        <Button onClick={handleGetInfoOrder}>Ver Orden</Button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-100">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
            <DialogPanel className="max-w-4xl space-y-4 border bg-white p-8 rounded-xl">
                <DialogTitle className="font-bold text-2xl">Información de la Orden</DialogTitle>
                <section>
                    {orderInfo?.map((orderItem)=> (
                        <>
                            <article key={orderItem.id} className="grid grid-cols-4 space-x-4 p-4">
                                <div className='h-25 border border-gray-400'>
                                    <img src={orderItem.products.url_image} alt={orderItem.products.title} className="h-full w-full object-center " />
                                </div>
                                <div className="flex items-center justify-start font-semibold">
                                    {orderItem.products.title}
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="font-bold">Precio: $</span>
                                    <span>{orderItem.price}</span>
                                </div>
                                <div className="flex items-center justify-center gap-x-2">
                                    <span className="font-bold">Cantidad: </span>
                                    <span>{orderItem.quantity}</span>
                                </div>
                            </article>
                            <hr className="border text-gray-500 w-full" />
                        </>
                    ))}
                </section>
                <div className="flex items-center justify-end">
                    <Button variant='destructive' onClick={() => setIsOpen(false)}>Cancel</Button>
                </div>
            </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}