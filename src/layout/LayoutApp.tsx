import HeaderComponent from '@/components/DashboardLayout/Header/HeaderComponent'
import ToastNotification from '@/components/DashboardLayout/ToastNotification'
import { Outlet } from 'react-router'

export default function LayoutApp() {
  return (
    <>
      <HeaderComponent />
      <main className='flex container mx-auto py-10 px-5'>
        <Outlet />
      </main>
      <ToastNotification />
    </>
  )
}
