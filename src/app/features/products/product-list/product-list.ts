import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product';
import { ProductCard } from '../product-card/product-card';

export type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  private router  = inject(Router);
  cartService     = inject(CartService);

  // ── All products
  readonly allProducts: Product[] = [
    { id: 1,  name: 'Sunny Dino Tee',      category: 'Kids',   price: 24.99, image: '🦕', bg: 'linear-gradient(135deg,#FFD166,#FFAA4C)', badge: 'New',  rating: 4.8, reviews: 120 },
    { id: 2,  name: 'Rainbow Hoodie',       category: 'Kids',   price: 44.99, image: '🌈', bg: 'linear-gradient(135deg,#FF6B6B,#FFB3B3)', badge: 'Hot',  rating: 4.9, reviews: 98  },
    { id: 3,  name: 'Ocean Shorts',         category: 'Boys',   price: 19.99, image: '🌊', bg: 'linear-gradient(135deg,#74C7EC,#4BA6D4)', badge: '',     rating: 4.6, reviews: 64  },
    { id: 4,  name: 'Star Dress',           category: 'Girls',  price: 34.99, image: '⭐', bg: 'linear-gradient(135deg,#6BCFB0,#4BB89A)', badge: 'Sale', rating: 4.7, reviews: 87  },
    { id: 5,  name: 'Cozy Joggers',         category: 'Boys',   price: 29.99, image: '🧸', bg: 'linear-gradient(135deg,#5E2D79,#9B6BB5)', badge: '',     rating: 4.5, reviews: 55  },
    { id: 6,  name: 'Butterfly Blouse',     category: 'Women',  price: 39.99, image: '🦋', bg: 'linear-gradient(135deg,#FFD166,#FF6B6B)', badge: 'New',  rating: 4.8, reviews: 143 },
    { id: 7,  name: 'Classic Chinos',       category: 'Men',    price: 49.99, image: '👔', bg: 'linear-gradient(135deg,#2B2B3B,#5E2D79)', badge: '',     rating: 4.6, reviews: 76  },
    { id: 8,  name: 'Floral Skirt',         category: 'Women',  price: 32.99, image: '🌸', bg: 'linear-gradient(135deg,#FF6B6B,#6BCFB0)', badge: 'Sale', rating: 4.7, reviews: 102 },
    { id: 9,  name: 'Denim Jacket',         category: 'Kids',   price: 54.99, image: '🧥', bg: 'linear-gradient(135deg,#74C7EC,#5E2D79)', badge: 'New',  rating: 4.8, reviews: 61  },
    { id: 10, name: 'Sunshine Jumpsuit',    category: 'Girls',  price: 38.99, image: '☀️', bg: 'linear-gradient(135deg,#FFD166,#6BCFB0)', badge: '',     rating: 4.5, reviews: 48  },
    { id: 11, name: 'Sport Polo',           category: 'Men',    price: 29.99, image: '🏃', bg: 'linear-gradient(135deg,#6BCFB0,#74C7EC)', badge: '',     rating: 4.4, reviews: 39  },
    { id: 12, name: 'Cozy Cardigan',        category: 'Women',  price: 44.99, image: '🧶', bg: 'linear-gradient(135deg,#FF6B6B,#FFD166)', badge: 'Hot',  rating: 4.9, reviews: 117 },
  ];

  // ── Filter & sort state
  activeCategory = signal<string>('All');
  searchQuery    = signal<string>('');
  sortBy         = signal<SortOption>('default');

  // ── Category tabs
  categories = ['All', 'Kids', 'Girls', 'Boys', 'Women', 'Men'];

  // ── Wishlist state
  wishlist = signal<Set<number>>(new Set());

  // ── Added to cart feedback
  addedToCart = signal<Set<number>>(new Set());

  // ── Filtered + sorted products (computed)
  filteredProducts = computed(() => {
    let products = [...this.allProducts];

    // Filter by category
    if (this.activeCategory() !== 'All') {
      products = products.filter(p => p.category === this.activeCategory());
    }

    // Filter by search
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (this.sortBy()) {
      case 'price-low':  return products.sort((a, b) => a.price - b.price);
      case 'price-high': return products.sort((a, b) => b.price - a.price);
      case 'rating':     return products.sort((a, b) => b.rating - a.rating);
      default:           return products;
    }
  });

  // ── Result count
  resultCount = computed(() => this.filteredProducts().length);

  // ── Set category
  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  // ── Set sort
  setSort(event: Event) {
    const val = (event.target as HTMLSelectElement).value as SortOption;
    this.sortBy.set(val);
  }

  // ── Clear search
  clearSearch() {
    this.searchQuery.set('');
  }

  // ── Clear all filters
  clearFilters() {
    this.activeCategory.set('All');
    this.searchQuery.set('');
    this.sortBy.set('default');
  }

  // ── Wishlist toggle
  toggleWishlist(productId: number, event: Event) {
    event.stopPropagation();
    const current = new Set(this.wishlist());
    current.has(productId) ? current.delete(productId) : current.add(productId);
    this.wishlist.set(current);
  }

  isWishlisted(productId: number): boolean {
    return this.wishlist().has(productId);
  }

  // ── Add to cart
  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(product);

    const current = new Set(this.addedToCart());
    current.add(product.id);
    this.addedToCart.set(current);

    setTimeout(() => {
      const updated = new Set(this.addedToCart());
      updated.delete(product.id);
      this.addedToCart.set(updated);
    }, 1500);
  }

  isAdded(productId: number): boolean {
    return this.addedToCart().has(productId);
  }

  // ── Badge class helper
  getBadgeClass(badge: string): string {
    const map: Record<string, string> = {
      'New':  'badge--new',
      'Hot':  'badge--hot',
      'Sale': 'badge--sale',
    };
    return map[badge] ?? '';
  }

  // ── Stars helper
  getStars(rating: number): string {
    return '⭐'.repeat(Math.floor(rating));
  }
}