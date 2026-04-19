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
    path: 'offers',
    loadComponent: () =>
      import('./features/offers/offers')
        .then(m => m.Offers)
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders')
        .then(m => m.Orders)
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./features/help-section/help-section')
        .then(m => m.HelpSection)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile')
        .then(m => m.Profile)
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
