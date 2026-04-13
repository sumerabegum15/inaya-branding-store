import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/products/product-list/product-list')
        .then(m => m.ProductList)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart/cart')
        .then(m => m.Cart)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
      .then(m => m.Login)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
