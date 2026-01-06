import { Button } from '@/components/ui/button'
import { useCreateOrEditProduct } from '@/store/useCreateOrEditProduct'
import type { ProductsProps } from '@/types/auth'

export function ButtonEditProduct({productId}:{productId: ProductsProps}) {

    const setProductToEdit = useCreateOrEditProduct((state)=> state.setProductToEdit)
    const setStatusModal = useCreateOrEditProduct((state)=> state.setStatusModal)

    const handleEditProduct = ()=> {
        setProductToEdit(productId)
        setStatusModal()
    }

  return (
    <>
        <Button onClick={handleEditProduct}>
            Editar
        </Button>
    </>
  )
}