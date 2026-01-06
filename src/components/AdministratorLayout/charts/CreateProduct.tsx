import { Button } from "@/components/ui/button"
import { CreateProductForm } from "../Products/CreateProductForm"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useCreateOrEditProduct } from "@/store/useCreateOrEditProduct"

export function CreateProduct() {

  const productToEdit = useCreateOrEditProduct((state)=> state.productToEdit)
  const statusModal = useCreateOrEditProduct((state)=> state.statusModal)
  const setStatusModal = useCreateOrEditProduct((state)=> state.setStatusModal)

  return (
    <>
      <Button variant="outline" onClick={setStatusModal}>Crear Producto</Button>
      <Dialog open={statusModal} onClose={setStatusModal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
          <DialogPanel className="container mx-auto max-w-3xl space-y-4 border bg-white p-8 rounded-xl">
            <DialogTitle className="font-bold">{productToEdit? 'Editar Producto': 'Crear nuevo Producto'}</DialogTitle>
            <section>
              <CreateProductForm />
            </section>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}


