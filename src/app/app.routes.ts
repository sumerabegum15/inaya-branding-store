import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.Home)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart/cart')
        .then(m => m.Cart)
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/products/product-list/product-list')
        .then(m => m.ProductList)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/products/product-details/product-details')
        .then(m => m.ProductDetails)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
