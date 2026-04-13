export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  bg: string;
  badge?: string;
  rating: number;
  reviews: number;
}