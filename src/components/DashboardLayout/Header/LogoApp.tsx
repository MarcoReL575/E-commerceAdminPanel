import { ShoppingBagIcon } from "lucide-react";
import { NavLink } from "react-router";

export default function LogoApp() {
  return (
    <NavLink to='/' className='flex items-center gap-x-2 text-green-600'>
        <ShoppingBagIcon className="size-12"/>
        <div className=" leading-none -space-y-3">
            <div>
                <span className="text-2xl font-bold">E</span>
                <span className="font-semibold pr-1">commerce</span>
            </div>
            <div>
                <span className="text-2xl font-bold">O</span>
                <span className="font-semibold">nline</span>
            </div>
        </div>
    </NavLink>
  )
}
