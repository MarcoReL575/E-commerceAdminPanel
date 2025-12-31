import { Button } from "@/components/ui/button";
import { addresCheckout } from "@/services/checkout-service";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductsStore } from "@/store/useProductsStore";
import type { FormCheckoutProducts } from "@/types/auth";
import { ShoppingBagIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function CheckoutForm() {

    const productsCart = useProductsStore((state)=> state.productsCart)
    const user = useAuthStore((state)=> state.user)
    const navigate = useNavigate()
    const total = useProductsStore((state)=> state.getTotal)
    const totalOrder = total()
    const { register, handleSubmit, formState: { errors } } = useForm<FormCheckoutProducts>()
    const onSubmit: SubmitHandler<FormCheckoutProducts> = async(addres) => {
        const paidSucces = await addresCheckout({addres, productsCart, user, totalOrder})
        if(paidSucces) {
            toast.success('Compra realizada correctamente')
            navigate('/')
        }
    }

  return (
    <form 
        className="flex flex-col gap-y-4 max-w-3xl p-5 bg-white rounded-xl shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div>
            <label>Nombre Completo: </label>
            <input 
                type="text" 
                className="p-2 w-full border border-gray-400 rounded-lg" 
                {...register('name', { required: '*El nombre es obligatorio' })}
            />
            {errors.name && <span className="text-sm text-red-400">{errors.name.message}</span>}
        </div>
        <div>
            <label>Calle: </label>
            <input 
                type="text" 
                className="p-2 w-full border border-gray-400 rounded-lg" 
                {...register('street', { required: '*El nombre es obligatorio' })}
            />
            {errors.street && <span className="text-sm text-red-400">{errors.street.message}</span>}
        </div>
        <section className="flex items-center justify-between gap-x-4">
            <div className=" flex-1">
                <label>Ciudad: </label>
                <input 
                    type="text" 
                    className="p-2 w-full border border-gray-400 rounded-lg" 
                    {...register('city', { required: '*El nombre es obligatorio' })}
            />
            {errors.city && <span className="text-sm text-red-400">{errors.city.message}</span>}
            </div>
            <div className="flex-1">
                <label>Estado: </label>
                <input 
                    type="text" 
                    className="p-2 w-full border border-gray-400 rounded-lg" 
                {...register('state', { required: '*El nombre es obligatorio' })}
            />
            {errors.state && <span className="text-sm text-red-400">{errors.state.message}</span>}
            </div>
        </section>
        <section className="flex items-center justify-between gap-x-4">
            <div className="flex-1">
                <label>Código Postal: </label>
                <input 
                    type="number" 
                    className="p-2 w-full border border-gray-400 rounded-lg" 
                    {...register('postalCode', { required: '*El nombre es obligatorio' })}
            />
            {errors.postalCode && <span className="text-sm text-red-400">{errors.postalCode.message}</span>}
            </div>
            <div className="flex-1">
                <label>País: </label>
                <input 
                    type="text" 
                    className="p-2 w-full border border-gray-400 rounded-lg" 
                    {...register('country', { required: '*El nombre es obligatorio' })}
            />
            {errors.country && <span className="text-sm text-red-400">{errors.country.message}</span>}
            </div>
        </section>
        <div>
            <label>Teléfono: </label>
            <input 
                type="text" 
                className="p-2 w-full border border-gray-400 rounded-lg" 
                {...register('phone', { required: '*El nombre es obligatorio' })}
            />
            {errors.phone && <span className="text-sm text-red-400">{errors.phone.message}</span>}
        </div>
        <div className="w-full flex items-center justify-center">
            <Button>
                <ShoppingBagIcon/>
                Confirmar Compra
            </Button>
        </div>
    </form>
  )
}
