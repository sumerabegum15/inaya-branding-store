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
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
      .then(m => m.Login)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
