import type { ProductsProps } from '@/types/auth';
import { create } from 'zustand'

interface CreateOrEditProductProps {
    statusModal: boolean;
    productToEdit: ProductsProps | null;
    setStatusModal: ()=> void;
    setProductToEdit: ( product: ProductsProps | null)=> void
}

export const useCreateOrEditProduct = create<CreateOrEditProductProps>()((set) => ({
    statusModal: false,
    productToEdit: null,
    setStatusModal: ()=> set((state) => ({ statusModal: !state.statusModal })),
    setProductToEdit: (product)=> set({ productToEdit: product })
}))
