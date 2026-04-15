import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product';
import { ProductCard } from '../products/product-card/product-card';

export interface Category {
  label: string;
  emoji: string;
  sub: string;
  bg: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private router = inject(Router);

  // ── Categories
  categories: Category[] = [
    { label: 'Kids',      emoji: '👶', sub: 'Ages 0–12',      bg: 'linear-gradient(135deg, #FFD166, #FFAA4C)', route: '/shop' },
    { label: 'Girls',     emoji: '👗', sub: 'Dresses & More',  bg: 'linear-gradient(135deg, #FF6B6B, #FFB3B3)', route: '/shop' },
    { label: 'Boys',      emoji: '👕', sub: 'Tees & Joggers',  bg: 'linear-gradient(135deg, #74C7EC, #4BA6D4)', route: '/shop' },
    { label: 'Women & Men', emoji: '🧥', sub: 'Adult Collection', bg: 'linear-gradient(135deg, #5E2D79, #9B6BB5)', route: '/shop' },
  ];

  // ── Featured Products
  featuredProducts: Product[] = [
    { id: 1, name: 'Sunny Dino Tee',    category: 'Kids',  price: 24.99, image: '🦕', bg: 'linear-gradient(135deg,#FFD166,#FFAA4C)', badge: 'New',  rating: 4.8, reviews: 120 },
    { id: 2, name: 'Rainbow Hoodie',    category: 'Kids',  price: 44.99, image: '🌈', bg: 'linear-gradient(135deg,#FF6B6B,#FFB3B3)', badge: 'Hot',  rating: 4.9, reviews: 98  },
    { id: 3, name: 'Ocean Shorts',      category: 'Boys',  price: 19.99, image: '🌊', bg: 'linear-gradient(135deg,#74C7EC,#4BA6D4)', badge: '',     rating: 4.6, reviews: 64  },
    { id: 4, name: 'Star Dress',        category: 'Girls', price: 34.99, image: '⭐', bg: 'linear-gradient(135deg,#6BCFB0,#4BB89A)', badge: 'Sale', rating: 4.7, reviews: 87  },
    { id: 5, name: 'Cozy Joggers',      category: 'Boys',  price: 29.99, image: '🧸', bg: 'linear-gradient(135deg,#5E2D79,#9B6BB5)', badge: '',     rating: 4.5, reviews: 55  },
    { id: 6, name: 'Butterfly Blouse',  category: 'Women', price: 39.99, image: '🦋', bg: 'linear-gradient(135deg,#FFD166,#FF6B6B)', badge: 'New',  rating: 4.8, reviews: 143 },
  ];

  // ── Why us features
  features = [
    { icon: '🧵', title: 'Premium Quality',  desc: 'Soft, durable fabrics safe for sensitive skin' },
    { icon: '🚚', title: 'Fast Delivery',    desc: '2–3 day shipping on all orders over ₹50' },
    { icon: '↩️', title: 'Easy Returns',     desc: '30-day hassle-free return policy' },
    { icon: '💬', title: '24/7 Support',     desc: 'Always here whenever you need help' },
  ];

  // ── Stats
  stats = [
    { value: '2K+',  label: 'Happy Kids'  },
    { value: '150+', label: 'Styles'      },
    { value: '4.9★', label: 'Rating'      },
  ];

  // ── Navigation
  goTo(path: string) {
    this.router.navigate([path]);
  }

  // ── Add to cart (wire up to CartService)
  // addToCart(product: Product, event: Event) {
  //   event.stopPropagation();

  //   // TODO: inject CartService and call cartService.addToCart(product)

  //   const current = new Set(this.addedToCart());
  //   current.add(product.id);
  //   this.addedToCart.set(current);
  //   setTimeout(() => {
  //     const updated = new Set(this.addedToCart());
  //     updated.delete(product.id);
  //     this.addedToCart.set(updated);
  //   }, 1500);
  // }

  // isAdded(productId: number): boolean {
  //   return this.addedToCart().has(productId);
  // }
}
