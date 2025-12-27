import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import type { ProductsProps } from '@/types/auth'
import { HeartIcon } from 'lucide-react'

export default function ProductCard({producto}:{producto: ProductsProps}) {

  const limitDescription = (maxLength= 70)=>{
    if(producto.description.length <= maxLength) return producto.description
    const limit = producto.description.slice(0, maxLength)
    return limit.slice(0, limit.lastIndexOf(" ")) + '...'
  }

  const limitTitle = (maxLength = 25)=>{
    if(producto.title.length <= maxLength) return producto.title
    const limit = producto.title.slice(0, maxLength)
    return limit.slice(0, limit.lastIndexOf(" ")) + '...'
  }

  return (
    <Card className=' relative max-h-120 flex'>
      <CardContent className='h-2/4 flex justify-center items-center overflow-hidden'>
        <img src={producto.url_image} alt={producto.title} className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out' />
        <div className='absolute top-8 right-8 size-10 rounded-full bg-white/50 flex items-center justify-center cursor-pointer hover:bg-white/70 '>
          <HeartIcon className='text-red-600' />
        </div>
      </CardContent>
      <CardDescription className='flex flex-col space-y-4'>
        <CardTitle className='text-xl text-center'>
          {limitTitle()}
        </CardTitle>
        <div className='px-5'>
          {limitDescription()}
        </div>
        <CardFooter className='flex items-center justify-between'>
          <span className='text-xl text-black font-semibold'>${producto.price}</span>
          <span className='border border-gray-300 p-1 rounded-lg'>Stock: {producto.stock}</span>
        </CardFooter>
       <div className='flex items-center justify-center'>
         <Button className='cursor-pointer'>
            Agregar al Carrito
          </Button>
       </div>
      </CardDescription>
    </Card>
  )
}
