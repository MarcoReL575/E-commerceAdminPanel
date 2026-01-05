export type UserRole = 'user' | 'admin'
export type Status = 'pendiente' | 'proceso' | 'completado'
export const statusOption = ['pendiente', 'proceso', 'completado']

export type CreateUserForm = {
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
}

export type ProductsProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  url_image: string;
}

export type ProductsInCart = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  url_image: string;
  cantidad: number;
  isLiked: boolean;
}

export type CreateProductForm = {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  is_active: string;
  url_image?: FileList | null;
}

export type AppRole = 'admin' | 'user';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponsePagination {
  data: ProductsProps[]
  count: number
}

export interface ProductsFiletrProps{
  page: number, 
  PAGE_SIZE: number,
  category?: string | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  searchInput?: string | null; 
}

export interface FormCheckoutProducts {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrdersProps {
  user_id: string;
  total: string;
  status: Status;
}

export interface OrdersShcema {
  id: string;
  total: number;
  status: Status;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  } | null
}

export interface OrderItemsSchema {
  id: string;
  quantity: number;
  price: number;
  products: {
    id: string,
    title: string,
    url_image: string,
  }
}

export interface  BestSellingProduct{
  id: string
  title: string
  url_image: string
  total_sold: number
  total_revenue: number
}

export interface BestSellingProductTable {
  product_name: string
  product_image: string
  total_sold: number
  total_revenue: number
}

export interface ProfileStats{
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  username: string;
}

export interface BestSellingProducts {
  id: string
  title: string
  url_image: string
  total_sold: number
  total_revenue: number
}

export type DateRange = {
  from: Date
  to: Date
}