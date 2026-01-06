import { category } from "@/helpers/categoryList";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import type { CreateProductForm } from "@/types/auth";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { createProduct } from "@/services/product-service";
import { toast } from "react-toastify";
import { useCreateOrEditProduct } from "@/store/useCreateOrEditProduct";
import { updateProduct } from "@/services/update-products-service";
import { useQueryClient } from "@tanstack/react-query";

export function CreateProductForm() {
    const productToEdit = useCreateOrEditProduct((state)=> state.productToEdit)
    const setStatusModal = useCreateOrEditProduct((state)=> state.setStatusModal)
    const [images, setImages] = useState<File | null>(null)
    const [previews, setPreviews] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CreateProductForm>()
    const queryClient = useQueryClient()

    
    const onSubmit = handleSubmit(async(data) => {
        try {
            if(productToEdit) {
                await updateProduct({
                    id: productToEdit.id,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                    is_active: data.is_active === 'true',
                    image: images,
                    currentImageUrl: productToEdit.url_image
                })
                toast.success('Producto Editado')
            } else {
                await createProduct(data)
                toast.success('Producto creado exitosamente')
                reset()
                setImages(null)
                setPreviews(null)
                setValue("url_image", undefined)
            }
            await queryClient.invalidateQueries({
                queryKey: ['productosHome']
            })
            setStatusModal()
        } catch (error) {
            console.log(error)
            toast.error('Ocurrió un error')
        }
    });

    useEffect(() => {
        if (productToEdit?.url_image) {
            setPreviews(productToEdit.url_image)
        }
    }, [productToEdit])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return
        setImages(file);
        setPreviews(URL.createObjectURL(file));

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        setValue("url_image", dataTransfer.files, { shouldValidate: true })
    };

    const removeImage = () => {
        setImages(null);
        setPreviews(null);
        setValue("url_image", undefined, { shouldValidate: true });
    };

    const { onChange, ...registerRest } = register('url_image')

    const statusDefault = productToEdit?.is_active === true ? 'true' : 'false'

  return (
    <form className="p-5 bg-white rounded-lg space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
            <label>Título del producto:</label>
            <input 
                type="text" 
                className="border p-2 rounded-lg"
                defaultValue={productToEdit?.title}
                {...register('title', { required:'*El título es obligatorio' })}
            />
            {errors.title && <span className="text-red-400 font-semibold text-sm">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Descripción del producto:</label>
            <input 
                type="text" 
                className="border p-2 rounded-lg"
                defaultValue={productToEdit?.description}
                {...register('description', { required:'*La descripción es obligatoria' })}
            />
            {errors.description && <span className="text-red-400 font-semibold text-sm">{errors.description.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Precio del producto:</label>
            <input 
                type="number" 
                className="border p-2 rounded-lg"
                defaultValue={productToEdit?.price}
                {...register('price', { required:'*El precio es obligatorio' })}
            />
            {errors.price && <span className="text-red-400 font-semibold text-sm">{errors.price.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Stock:</label>
            <input 
                type="number" 
                className="border p-2 rounded-lg"
                defaultValue={productToEdit?.stock}
                {...register('stock', { required:'*La cantidad de stock es obligatorio' })}
            />
            {errors.stock && <span className="text-red-400 font-semibold text-sm">{errors.stock.message}</span>}
        </div>
        <div className="flex flex-col">
            <select
                className="border p-2 rounded-lg"
                defaultValue={productToEdit?.category_id}
                {...register('category', { required:'*La categoría es obligatoria' })}
            >
                <option value="">--Selecciona una categoría--</option>
                {category.map((option)=> (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors.category && <span className="text-red-400 font-semibold text-sm">{errors.category.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Status:</label>
            <select
                className="border p-2 rounded-lg"
                defaultValue={statusDefault}
                {...register('is_active', { required:'*La categoría es obligatoria' })}
            >
                <option value="">--Selecciona un status--</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>
            {errors.is_active && <span className="text-red-400 font-semibold text-sm">{errors.is_active.message}</span>}
        </div>
        <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Imágenes del producto</label>
        
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors group cursor-pointer">
                <input 
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                        onChange(e); // Avisa a React Hook Form del cambio
                        handleImageChange(e); // Ejecuta tu lógica de previsualización
                    }}
                    {...registerRest}
                />
                {errors.url_image && <span className="text-red-400 font-semibold text-sm">{errors.url_image.message}</span>}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                        <ImagePlusIcon size={24} />
                    </div>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-blue-600">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG o WEBP (Máx. 5MB)</p>
                </div>
            </div>

            {/* Contenedor de Previsualización */}
            {previews && (
                <div className="relative aspect-square w-40 rounded-lg overflow-hidden border">       
                    <img 
                        src={previews} 
                        alt="preview" 
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                        <XIcon size={14} />
                    </button>
                </div>
            )}
        </div>
        <div className="flex items-center justify-between">
            <Button type="submit">
                {productToEdit ? 'Editar Producto': 'Crear Producto'}
            </Button>
            <Button variant='destructive' onClick={setStatusModal} className="px-10">
                Cancelar
            </Button>
        </div>
    </form>
  )
}
