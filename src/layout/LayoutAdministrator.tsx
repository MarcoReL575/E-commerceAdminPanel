import { AppSidebar } from "@/components/AdministratorLayout/dashboard/app-sidebar"
import { SiteHeader } from "@/components/AdministratorLayout/dashboard/site-header"
import ToastNotification from "@/components/DashboardLayout/ToastNotification"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"


export default function LayoutAdministrator() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
            <ToastNotification />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
