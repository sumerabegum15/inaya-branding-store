import { Component, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product: any;

  constructor(private cartService: CartService) {}

  added = false;

  addToCart() {
    this.cartService.addToCart(this.product);
    this.added = true;

    setTimeout(() => this.added = false, 1000);
  }

}
