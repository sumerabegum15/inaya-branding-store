import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Sunny Dino Tee',    category: 'Kids',  price: 24.99, image: '🦕', bg: 'linear-gradient(135deg,#FFD166,#FFAA4C)', badge: 'New',  rating: 4.8, reviews: 120 },
    { id: 2, name: 'Rainbow Hoodie',    category: 'Kids',  price: 44.99, image: '🌈', bg: 'linear-gradient(135deg,#FF6B6B,#FFB3B3)', badge: 'Hot',  rating: 4.9, reviews: 98  },
    { id: 3, name: 'Ocean Shorts',      category: 'Boys',  price: 19.99, image: '🌊', bg: 'linear-gradient(135deg,#74C7EC,#4BA6D4)', badge: '',     rating: 4.6, reviews: 64  },
    { id: 4, name: 'Star Dress',        category: 'Girls', price: 34.99, image: '⭐', bg: 'linear-gradient(135deg,#6BCFB0,#4BB89A)', badge: 'Sale', rating: 4.7, reviews: 87  },
    { id: 5, name: 'Cozy Joggers',      category: 'Boys',  price: 29.99, image: '🧸', bg: 'linear-gradient(135deg,#5E2D79,#9B6BB5)', badge: '',     rating: 4.5, reviews: 55  },
    { id: 6, name: 'Butterfly Blouse',  category: 'Women', price: 39.99, image: '🦋', bg: 'linear-gradient(135deg,#FFD166,#FF6B6B)', badge: 'New',  rating: 4.8, reviews: 143 },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}