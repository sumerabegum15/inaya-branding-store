import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  items: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.items = items;
    });
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)),
      0
    );
  }

}
