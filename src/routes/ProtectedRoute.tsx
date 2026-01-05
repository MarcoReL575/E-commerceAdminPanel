import { useAuthStore } from "@/store/useAuthStore"
import { Navigate, Outlet } from "react-router"

export default function ProtectedRoute() {
    const { session, authInitialized } = useAuthStore()

    if (!authInitialized) {
        return (
            <div className="flex items-center justify-center h-screen">
              Cargandose...
            </div>
        )
    }

    if (!session) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
