import {AlertDialog,AlertDialogContent,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CreateProductForm } from "../Products/CreateProductForm"

export function CreateProduct() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Crear Producto</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Crear nuevo Producto</AlertDialogTitle>
            <CreateProductForm />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
