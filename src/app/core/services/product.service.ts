import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'T-Shirt', price: 499, image: 'assets/tshirt.jpg', category: 'men' },
    { id: 2, name: 'Dress', price: 999, image: 'assets/dress.jpg', category: 'women' },
    { id: 3, name: 'Jeans', price: 1299, image: 'assets/jeans.jpg', category: 'men' }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}