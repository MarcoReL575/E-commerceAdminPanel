import { useFiltersStore } from "@/store/useFiltersStore";
import { SearchIcon } from "lucide-react";

export default function SearchFilter() {

    const setSearchInput = useFiltersStore((state)=> state.setSearchInput)
    const handleInputSearch = (input: string)=> {
        setSearchInput(input)
    }

  return (
    <div className="flex items-center bg-white border-xl w-full col-span-3 border border-gray-400 text-gray-500 p-2 rounded-xl gap-x-2">
        <button className=" cursor-pointer">
            <SearchIcon />
        </button>
        <input 
            type="text" 
            placeholder="Buscar productos..."
            className=" outline-none "
            onChange={(e)=> handleInputSearch(e.target.value)}
        />
    </div>
  )
}
