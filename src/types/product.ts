export type Product = {
  id: number;
  names: string;
  slug: string;
  price: string;     // viene como string en tu API
  stock: number;
  is_active: boolean;
  url_image: string;
  category_name: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};