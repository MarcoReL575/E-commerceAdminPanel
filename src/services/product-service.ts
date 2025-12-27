import { supabase } from "@/supabase/supabaseClient";
import type { CreateProductForm, ProductsProps } from "@/types/auth";

export async function productService() {
    console.log('petición')
    const {data, error} = await supabase
        .from('products')
        .select()
    if(error){
        console.log(error)
        throw new Error('Error al obtener los datos')
    }
    console.log(data)
    return data as unknown as ProductsProps[]
}


export async function createProduct(data: CreateProductForm) {
    if(!data.url_image) return
    const files = Array.from(data.url_image);
    if (files.length === 0) return;
    
    const file = files[0];
    const fileName = `${crypto.randomUUID()}-${file.name}`;

    const { data: uploadData, error: uploadError } =
        await supabase.storage
            .from("productosImage")
            .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: publicUrl } = supabase
        .storage
        .from("products")
        .getPublicUrl(uploadData.path);

    const { error } = await supabase
        .from('products')
        .insert({
            title: data.title,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            category_id: data.category,
            is_active: data.is_active === 'true' ? true : false,
            url_image: publicUrl.publicUrl,
        });
    if(error) throw new Error('Error al crear producto')
}