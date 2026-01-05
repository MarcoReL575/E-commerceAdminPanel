import {SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListChecksIcon, ChartBarIcon } from "lucide-react"
import { NavLink } from "react-router"

const navMain =[
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Productos",
    url: "/admin/products",
    icon: ListChecksIcon,
  },
  {
    title: "Órdenes",
    url: "/admin/orders",
    icon: ChartBarIcon,
  },
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                <NavLink 
                  to={item.url} 
                  end={item.url === '/admin'}
                  className={({isActive})=>`flex items-center gap-x-2 w-full p-2 rounded-lg
                    ${isActive ? 'bg-black text-white' : 'hover:bg-black/30 hover:text-white'}`}
                  >
                  {item.icon && <item.icon className="size-5" />}
                  <span>{item.title}</span>
               </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
