import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

interface NavLink {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  private router   = inject(Router);
  cartService      = inject(CartService);

  // ── Nav links
  navLinks: NavLink[] = [
    { label: 'Home',      route: '/home',    icon: '🏠' },
    { label: 'Shop',      route: '/shop',    icon: '🛍️' },
    { label: 'Offers 🔥', route: '/offers',  icon: '🎁' },
    { label: 'My Orders', route: '/orders',  icon: '📦' },
    { label: 'Help',      route: '/help',    icon: '💬' },
  ];

  // ── Mobile menu open/close
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  // ── Close menu on outside click or route change
  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  // ── Scrolled state — adds shadow to navbar on scroll
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  // ── Navigate to cart
  goTo(path: string) {
    this.closeMenu();
    this.router.navigate([path]);
  }
}