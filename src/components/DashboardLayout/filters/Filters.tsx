import { category as CategorList } from "@/helpers/categoryList";
import { useFiltersStore } from "@/store/useFiltersStore";

export default function Filters() {

    const setCategory = useFiltersStore((state)=> state.setCategory)
    const setMaxPrice = useFiltersStore((state)=> state.setMaxPrice)
    const setMinPrice = useFiltersStore((state)=> state.setMinPrice)

  return (
        <>
            <div className="flex flex-col space-y-2">
                <label>Selecciona una Categoría:</label>
                <select
                    className="p-2 border border-gray-400 rounded-xl w-full"
                    onChange={(e)=> setCategory(e.target.value)}
                >
                    <option value="">--Todas las categorías--</option>
                    {CategorList.map((cat)=> (
                        <option key={cat.label} value={cat.value}>{cat.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Precio mínimo:</label>
                <input 
                    type="number"
                    className="p-2 border border-gray-400 rounded-xl w-full" 
                    placeholder="$0"
                    onBlur={(e)=> setMinPrice(+e.target.value)}
                />
            </div>
            <div>
                <label>Precio máximo:</label>
                <input 
                    type="number"
                    className="p-2 border border-gray-400 rounded-xl w-full" 
                    placeholder="$10000"
                    onBlur={(e)=> setMaxPrice(+e.target.value)}
                />
            </div>
        </>
    )
}
