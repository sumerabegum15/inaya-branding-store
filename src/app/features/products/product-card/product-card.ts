import { Component, Input, signal } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product: any;

  constructor(private cartService: CartService, 
    private router: Router
  ) {}

  isAdded = false;
  // ── Wishlist state per product
  wishlist = signal<Set<number>>(new Set());

  // ── Cart added state (visual feedback)
  addedToCart = signal<Set<number>>(new Set());

  // ── Toggle wishlist
  toggleWishlist(productId: number, event: Event) {
    event.stopPropagation();
    const current = new Set(this.wishlist());
    current.has(productId) ? current.delete(productId) : current.add(productId);
    this.wishlist.set(current);
  }

  isWishlisted(productId: number): boolean {
    return this.wishlist().has(productId);
  }

  // ── Navigation
  goTo(path: string) {
    this.router.navigate([path]);
  }

  // ── Navigate to product detail (future)
  goToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.isAdded = true;

    setTimeout(() => this.isAdded = false, 1000);
  }

  // ── Badge color helper
  getBadgeClass(badge: string): string {
    const map: Record<string, string> = {
      'New':  'badge-new',
      'Hot':  'badge-hot',
      'Sale': 'badge-sale',
    };
    return map[badge] ?? '';
  }

  // ── Star rating helper
  getStars(rating: number): string {
    return '⭐'.repeat(Math.floor(rating));
  }

}
