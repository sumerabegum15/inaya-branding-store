import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './core/services/cart.service';
import { Footer } from './shared/footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  cartCount = 0;
  showNavbar = true;
  private router = inject(Router);
  showFooter = true;

  constructor(private cartService: CartService) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const hideOn = ['/login'];  // add more routes here if needed
        const hide = hideOn.some(route => e.url.includes(route));
        this.showNavbar = !hide;
        this.showFooter = !hide;
      });
  }


  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

}
