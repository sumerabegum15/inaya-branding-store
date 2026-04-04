import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartItems = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const current = this.cartItems.value;

    const existing = current.find(p => p.id === product.id);

    if (existing) {
      existing.quantity! += 1;
      this.cartItems.next([...current]);
    } else {
      this.cartItems.next([...current, { ...product, quantity: 1 }]);
    }
  }

  getCartItems(): Product[] {
    return this.cartItems.value;
  }

  removeItem(index: number) {
    const current = this.cartItems.value;   // get current array
    current.splice(index, 1);               // remove item
    this.cartItems.next([...current]);      // emit new value
  }
  
}
