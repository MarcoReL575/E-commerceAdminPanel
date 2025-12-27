import { category } from "@/helpers/categoryList";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import type { CreateProductForm } from "@/types/auth";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { createProduct } from "@/services/product-service";
import { toast } from "react-toastify";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

export function CreateProductForm() {
    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CreateProductForm>()
    
    const onSubmit = handleSubmit(async(data) => {
        try {
            await createProduct(data)
            toast.success('Producto creado exitosamente')
            reset()
            setImages([])
            setPreviews([])
            setValue("url_image", undefined)
        } catch (error) {
            
        }
    })

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        const filePreviews: string[] = files.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setImages(newImages);
        setPreviews(newPreviews);
        const dataTransfer = new DataTransfer();
        newImages.forEach(file => dataTransfer.items.add(file));
        setValue("url_image", dataTransfer.files, { shouldValidate: true });
    };

    const { onChange, ...registerRest } = register('url_image', {required: '*Debes subir al menos una imagen'})

  return (
    <form className="p-5 bg-white rounded-lg space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
            <label>Título del producto:</label>
            <input 
                type="text" 
                className="border p-2 rounded-lg"
                {...register('title', { required:'*El título es obligatorio' })}
            />
            {errors.title && <span className="text-red-400 font-semibold text-sm">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Descripción del producto:</label>
            <input 
                type="text" 
                className="border p-2 rounded-lg"
                {...register('description', { required:'*La descripción es obligatoria' })}
            />
            {errors.description && <span className="text-red-400 font-semibold text-sm">{errors.description.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Precio del producto:</label>
            <input 
                type="number" 
                className="border p-2 rounded-lg"
                {...register('price', { required:'*El precio es obligatorio' })}
            />
            {errors.price && <span className="text-red-400 font-semibold text-sm">{errors.price.message}</span>}
        </div>
        <div className="flex flex-col">
            <label>Stock:</label>
            <input 
                type="number" 
                className="border p-2 rounded-lg"
                {...register('stock', { required:'*La cantidad de stock es obligatorio' })}
            />
            {errors.stock && <span className="text-red-400 font-semibold text-sm">{errors.stock.message}</span>}
        </div>
        <div className="flex flex-col">
            <select
                className="border p-2 rounded-lg"
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
                    multiple
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
            {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4 w-full">
                    {previews.map((url, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                            <img 
                                src={url} 
                                alt="preview" 
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <XIcon size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="flex items-center justify-between">
            <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-400 cursor-pointer hover:text-white">Cancelar</AlertDialogCancel>
            <Button type="submit" className="cursor-pointer">
                Crear Producto
            </Button>
        </div>
    </form>
  )
}
