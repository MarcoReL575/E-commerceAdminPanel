import { supabase } from "@/supabase/supabaseClient";
import type { UpdateProductProps } from "@/types/auth";

export async function updateProduct (props: UpdateProductProps) {
    const { category,description,id,is_active,price,stock,title,currentImageUrl,image } = props
    let imageUrl = currentImageUrl
    if(image) {
        const fileExt = image.name.split('.').pop()
        const filePath = `products/${id}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, image, {
                upsert: true
            });
        if(uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('products')
            .getPublicUrl(filePath)
        imageUrl = data.publicUrl
    }

    const { error } = await supabase
        .from('products')
        .update({
            title,
            description,
            price,
            stock,
            category_id: category,
            is_active,
            url_image: imageUrl,
        })
        .eq('id', id)
        .select()
    if(error) console.log(error)
}