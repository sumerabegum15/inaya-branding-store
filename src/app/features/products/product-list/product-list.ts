import { Component } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products: Product[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
