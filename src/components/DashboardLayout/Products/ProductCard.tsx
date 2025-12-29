import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import type { ProductsInCart } from '@/types/auth'
import AddToCartButton from './AddToCartButton'
import AddFavButton from './AddFavButton'

export default function ProductCard({producto}:{producto: ProductsInCart}) {

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
    <Card className=' relative max-h-110 flex'>
      <CardContent className='h-2/4 flex justify-center items-center overflow-hidden'>
        <img src={producto.url_image} alt={producto.title} className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out' />
        <AddFavButton producto={producto} />
      </CardContent>
      <CardDescription className='flex flex-col space-y-4'>
        <CardTitle className='text-xl text-center'>
          {limitTitle()}
        </CardTitle>
        <div className='px-5'>
          {limitDescription()}
        </div>
        <CardFooter className=' flex items-center justify-between'>
          <span className='text-xl text-black font-semibold'>${producto.price}</span>
          <span className='border border-gray-300 p-1 rounded-lg'>Stock: {producto.stock}</span>
        </CardFooter>
       <div className='flex items-center justify-center w-full px-4'>
          <AddToCartButton product={producto}/>
       </div>
      </CardDescription>
    </Card>
  )
}
