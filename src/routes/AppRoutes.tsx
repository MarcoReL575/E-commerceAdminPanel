import LayoutApp from "@/layout/LayoutApp";
import HomePage from "@/pages/UserPages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "../pages/UserPages/CartPage";
import FavPage from "../pages/UserPages/FavPage";
import LoginPage from "@/pages/LoginPages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SigninPage from "@/pages/LoginPages/SignInPage";
import LayoutAdministrator from "@/layout/LayoutAdministrator";
import DashboardPage from "@/pages/AdministratorPages/DashboardPage";
import ProductsPage from "@/pages/AdministratorPages/ProductsPage";
import OrdersPage from "@/pages/AdministratorPages/OrdersPage";
import LogsPage from "@/pages/AdministratorPages/LogsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Usuario logeado */}
        <Route element={ <ProtectedRoute /> } >
          <Route element= { <LayoutApp /> }>
            <Route path="/"  element={ <HomePage />} />
            <Route path="/cart"  element={<CartPage />} />
            <Route path="/fav"  element={<FavPage />} />
          </Route>
        </Route>
        {/* Rutas de Administrador */}
        
        <Route element={ <ProtectedRoute />} >
          <Route element={<LayoutAdministrator />} >
            <Route path="/admin"  element={<DashboardPage />} />
            <Route path="/admin/products"  element={<ProductsPage />} />
            <Route path="/admin/orders"  element={<OrdersPage />} />
            <Route path="/admin/logs"  element={<LogsPage />} />
          </Route>
        </Route>
        
        {/* Rutas Públicas */}
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/signin" element={ <SigninPage /> } />
      </Routes>
    </BrowserRouter>
  )
}
