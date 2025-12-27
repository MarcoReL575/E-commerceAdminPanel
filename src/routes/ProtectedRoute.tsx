import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {

  const isLoading = useAuthStore((state)=> state.isLoading);
  const session = useAuthStore((state)=> state.user);
  
  if(isLoading) return <div>Cargando...</div>;
  if(!session) {
    return <Navigate to='/login' />
  }

  if(session) return <Outlet /> ;
}
