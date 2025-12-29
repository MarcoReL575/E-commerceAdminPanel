export type UserRole = 'user' | 'admin'

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

export type AppRole = 'ADMIN' | 'USER';

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