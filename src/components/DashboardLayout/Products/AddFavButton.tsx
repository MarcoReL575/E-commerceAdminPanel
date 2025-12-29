import { useFavsProductsStore } from '@/store/useFavsProductsStore'
import type { ProductsInCart } from '@/types/auth'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as FavIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'

export default function AddFavButton({producto}: {producto: ProductsInCart}) {

    const toggleToFav = useFavsProductsStore((state)=> state.toggleToFav)
    const handleAddToFav = ()=> {
        toggleToFav(producto)
    }
    console.log(producto)

  return (
    <div className='absolute top-8 overflow-hidden right-8 size-9 rounded-full bg-white/50 flex items-center justify-center cursor-pointer hover:bg-white/70 '>
        <Button variant='ghost' onClick={handleAddToFav}>
            {producto.isLiked === true 
                ? <FavIcon className='size-8 text-red-400' />
                : <HeartIcon className='text-red-600 size-8'  />
            }
        </Button>
    </div>
  )
}
