import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

const VALID_PROMO_CODES: Record<string, number> = {
  'KIDDI20':   0.20,
  'WELCOME10': 0.10,
  'SUMMER30':  0.30,
};

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartService = inject(CartService);
  private router = inject(Router);

  // ── Promo code state
  promoInput  = signal('');
  promoError  = signal('');
  promoApplied = signal('');
  discountRate = signal(0);

  // ── Order summary computed values
  subtotal = computed(() => this.cartService.subtotal());

  discount = computed(() =>
    this.subtotal() * this.discountRate()
  );

  shipping = computed(() =>
    this.subtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  );

  total = computed(() =>
    this.subtotal() - this.discount() + this.shipping()
  );

  isFreeShipping = computed(() => this.shipping() === 0);

  // ── Qty controls
  increment(productId: number) {
    this.cartService.updateQty(productId, +1);
  }

  decrement(productId: number) {
    this.cartService.updateQty(productId, -1);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  // ── Apply promo code
  applyPromo() {
    const code = this.promoInput().trim().toUpperCase();

    if (!code) {
      this.promoError.set('Please enter a promo code.');
      return;
    }

    if (this.promoApplied()) {
      this.promoError.set('A promo code is already applied.');
      return;
    }

    const rate = VALID_PROMO_CODES[code];
    if (rate) {
      this.discountRate.set(rate);
      this.promoApplied.set(code);
      this.promoError.set('');
      this.promoInput.set('');
    } else {
      this.promoError.set('Invalid promo code. Try KIDDI20.');
    }
  }

  // ── Remove promo
  removePromo() {
    this.discountRate.set(0);
    this.promoApplied.set('');
    this.promoError.set('');
  }

  // ── Navigate
  goToShop() {
    this.router.navigate(['/shop']);
  }

  goToCheckout() {
    // TODO: wire up to checkout page / payment flow
    this.router.navigate(['/checkout']);
  }

  // ── Helper: item subtotal
  itemTotal(price: number, qty: number): number {
    return price * qty;
  }
}