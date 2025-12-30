import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FiltersProps {
    searchInput: string | null
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    setSearchInput: (searchInput: string) => void
    setCategory: (category: string)=> void;
    setMinPrice: (minPrice: number)=> void;
    setMaxPrice: (maxPrice: number)=> void;
}

export const useFiltersStore = create<FiltersProps>()(
    devtools(
        (set) => ({
            searchInput: null,
            category: null,
            minPrice: null,
            maxPrice: null,
            setSearchInput: (searchInput) => set({ searchInput }),
            setCategory: (category) => set({ category }),
            setMinPrice: (minPrice) => set({ minPrice }),
            setMaxPrice: (maxPrice) => set({ maxPrice }),
        }),
    ),
)
