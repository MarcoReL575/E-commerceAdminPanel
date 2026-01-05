import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MenuIcon, X, ShoppingCart, HeartIcon, LogOutIcon, LayoutDashboardIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import LogoApp from './LogoApp'
import { Button } from '../../ui/button'
import { useAuth } from '@/services/authService'
import { useAuthStore } from '@/store/useAuthStore'

const navigation = [
    { name: 'Favoritos', href: '/fav', Icon: HeartIcon },
    { name: 'Mis Compras', href: '/cart', Icon: ShoppingCart },
]

export default function HeaderComponent() {

    const { signOutSession } = useAuth()
    const role = useAuthStore((state)=> state.role)
    const isAdmin = role === 'admin'

    const handleSignOut = async()=> {
        signOutSession()
    }

    return (
        <Disclosure
            as="nav"
            className="relative bg-white"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-18 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon aria-hidden="true" className="block size-6 group-data-open:hidden text-black" />
                            <div className=' bg-red-500/80 text-white rounded cursor-pointer'>
                                <X aria-hidden="true" className="hidden size-6 group-data-open:block " />
                            </div>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:justify-between">
                        <div>
                            <LogoApp />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm: items-center gap-4">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <NavLink
                                        to={item.href}
                                        key={item.name}
                                        className={({isActive})=> `flex p-2 gap-x-1 rounded-lg ${isActive && 'font-semibold bg-gray-900/80 text-white'}`}
                                    >
                                        {item.name}
                                        <item.Icon />
                                    </NavLink>
                                ))}
                            </div>
                            {isAdmin && (
                                <NavLink to="/admin" className=''>
                                    <Button variant="ghost">
                                        AdminPanel
                                        <LayoutDashboardIcon className="h-5 w-5" />
                                    </Button>
                                </NavLink>
                            )}
                           
                            <Button 
                                variant='destructive'
                                onClick={handleSignOut}
                            >
                                Logout
                                <LogOutIcon />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({isActive})=> `flex p-2 gap-x-1 rounded-lg hover:bg-gray-900/60 hover:text-white transition-colors ease-in duration-300 ${isActive && 'font-semibold bg-gray-900/80 text-white'}`}
                        >
                            <item.Icon />
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
