import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import type { ProductsInCart, ProductsProps } from '@/types/auth'
import { HeartIcon } from 'lucide-react'
import AddToCartButton from './AddToCartButton'

export default function ProductCard({producto}:{producto: ProductsProps}) {

  const productToCart: ProductsInCart = {
    ...producto,
    cantidad: 1
  }

  const limitDescription = (maxLength= 70)=>{
    if(productToCart.description.length <= maxLength) return productToCart.description
    const limit = productToCart.description.slice(0, maxLength)
    return limit.slice(0, limit.lastIndexOf(" ")) + '...'
  }

  const limitTitle = (maxLength = 25)=>{
    if(productToCart.title.length <= maxLength) return productToCart.title
    const limit = productToCart.title.slice(0, maxLength)
    return limit.slice(0, limit.lastIndexOf(" ")) + '...'
  }

  return (
    <Card className=' relative max-h-120 flex'>
      <CardContent className='h-2/4 flex justify-center items-center overflow-hidden'>
        <img src={productToCart.url_image} alt={productToCart.title} className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out' />
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
          <span className='text-xl text-black font-semibold'>${productToCart.price}</span>
          <span className='border border-gray-300 p-1 rounded-lg'>Stock: {productToCart.stock}</span>
        </CardFooter>
       <div className='flex items-center justify-center'>
          <AddToCartButton product={productToCart} />
       </div>
      </CardDescription>
    </Card>
  )
}
