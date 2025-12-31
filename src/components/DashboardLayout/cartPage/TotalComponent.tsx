import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useProductsStore } from '@/store/useProductsStore'
import { NavLink } from 'react-router'

export default function TotalComponent() {

    const getTotal = useProductsStore((state)=> state.getTotal)

    const subTotal = getTotal() 
    const descuento = 0
    const total = subTotal + descuento

  return (
    <Card className="bg-white h-fit px-2 py-4 rounded-xl shadow-lg space-y-4">
        <CardTitle className='text-xl text-center'>Resumen</CardTitle>
        <CardContent className='flex flex-col space-y-2'>
            <div className='flex items-center justify-between'>
                <span className='text-gray-400'>Subtotal:</span>
                <span>${total}</span>
            </div>
            <div className='flex items-center justify-between'>
                <span className='text-gray-400'>Descunto: </span>
                <span>${descuento}</span>
            </div>
            <hr className='border border-black' />
            <div className='flex items-center justify-between text-lg'>
                <span>Total:</span>
                <span>${total}</span>
            </div>
        </CardContent>
        <NavLink to='/checkout' className='flex items-center justify-center'>
            <Button>
                Proceder al Pago
            </Button>
        </NavLink>
    </Card>
  )
}
