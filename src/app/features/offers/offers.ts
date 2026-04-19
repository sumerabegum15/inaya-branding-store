import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


export interface Offer {
  code: string;
  discount: string;
  desc: string;
  expiry: string;
  color: string;
  textColor?: string;
  emoji: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.html',
  styleUrl: './offers.scss'
})
export class Offers {

  private router = inject(Router);

  offers: Offer[] = [
    { code: 'KIDDI20',   discount: '20% OFF',       desc: 'All kids wear',         expiry: 'Apr 30, 2026',  color: '#FF6B6B', emoji: '👶' },
    { code: 'WELCOME10', discount: '10% OFF',        desc: 'Your first order',      expiry: 'No expiry',     color: '#5E2D79', emoji: '🎉' },
    { code: 'FREESHIP',  discount: 'Free Shipping',  desc: 'Orders above $50',      expiry: 'May 15, 2026',  color: '#6BCFB0', emoji: '🚚' },
    { code: 'SUMMER30',  discount: '30% OFF',        desc: 'Summer collection',     expiry: 'Jun 1, 2026',   color: '#FFD166', textColor: '#2B2B3B', emoji: '☀️' },
    { code: 'GIRLS15',   discount: '15% OFF',        desc: 'All girls collection',  expiry: 'May 31, 2026',  color: '#74C7EC', emoji: '👗' },
    { code: 'FAMILY25',  discount: '25% OFF',        desc: 'Buy 3 or more items',   expiry: 'Jun 30, 2026',  color: '#6BCFB0', emoji: '👨‍👩‍👧' },
  ];

  // ── Copied state per code
  copiedCode = signal<string>('');

  copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    this.copiedCode.set(code);
    setTimeout(() => this.copiedCode.set(''), 2000);
  }

  isCopied(code: string): boolean {
    return this.copiedCode() === code;
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }
}