import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/store/useProductsStore";
import type { ProductsInCart } from "@/types/auth";
import { MinusIcon, PlusIcon } from "lucide-react";

interface Props{
    operation: string;
    product: ProductsInCart
}

export default function ButtonAddQuantity({ operation, product }: Props) {

    const addQuantity = useProductsStore((state)=> state.addQuantity)
    const handleChangeQuantity = ()=> {
        addQuantity(operation, product)
    }

  return (
    <Button variant='outline' onClick={handleChangeQuantity}>
        {operation === 'suma' 
            ? <PlusIcon /> 
            :<MinusIcon />
        }
    </Button>
  )
}
