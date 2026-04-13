import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

export interface CartItem extends Product {
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
   private cartItems = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItems.asObservable();

  // ── State
  private _items = signal<CartItem[]>([]);

  // ── Public readable signal
  items = this._items.asReadonly();

  // ── Computed values
  cartCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.qty, 0)
  );

  subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  // ── Add to cart
  addToCart(product: Product): void {
    const existing = this._items().find(i => i.id === product.id);
    if (existing) {
      this._items.update(items =>
        items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      );
    } else {
      this._items.update(items => [...items, { ...product, qty: 1 }]);
    }
  }

  // ── Update quantity
  updateQty(productId: number, delta: number): void {
    this._items.update(items =>
      items
        .map(i => i.id === productId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)  // auto-remove if qty reaches 0
    );
  }

  // ── Remove item
  removeItem(productId: number): void {
    this._items.update(items => items.filter(i => i.id !== productId));
  }

  // ── Clear cart
  clearCart(): void {
    this._items.set([]);
  }

  // ── Check if product is in cart
  isInCart(productId: number): boolean {
    return this._items().some(i => i.id === productId);
  }
}