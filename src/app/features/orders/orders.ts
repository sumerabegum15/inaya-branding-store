// ─────────────────────────────────────────────────────────
// KiddiThread — Orders Component
// Place at: src/app/pages/orders/orders.component.ts
// ─────────────────────────────────────────────────────────

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: OrderStatus;
  statusColor: string;
  address: string;
}

const STATUS_STEPS = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders {

  private router = inject(Router);

  readonly steps = STATUS_STEPS;

  orders: Order[] = [
    {
      id: '#KT-2841', date: 'Apr 8, 2026',
      items: ['Sunny Dino Tee', 'Rainbow Hoodie'],
      total: 69.98, status: 'Delivered', statusColor: '#6BCFB0',
      address: '123 Maple Street, New York, NY 10001'
    },
    {
      id: '#KT-2756', date: 'Mar 22, 2026',
      items: ['Star Dress'],
      total: 34.99, status: 'Delivered', statusColor: '#6BCFB0',
      address: '123 Maple Street, New York, NY 10001'
    },
    {
      id: '#KT-2990', date: 'Apr 11, 2026',
      items: ['Ocean Shorts', 'Cozy Joggers'],
      total: 49.98, status: 'Shipped', statusColor: '#74C7EC',
      address: '123 Maple Street, New York, NY 10001'
    },
    {
      id: '#KT-3012', date: 'Apr 12, 2026',
      items: ['Butterfly Blouse'],
      total: 39.99, status: 'Processing', statusColor: '#FFD166',
      address: '123 Maple Street, New York, NY 10001'
    },
    {
      id: '#KT-3045', date: 'Apr 15, 2026',
      items: ['Denim Jacket', 'Star Dress', 'Ocean Shorts'],
      total: 109.97, status: 'Out for Delivery', statusColor: '#FF6B6B',
      address: '456 Oak Avenue, Brooklyn, NY 11201'
    },
  ];

  // ── Expanded order tracker
  expandedOrder = signal<string | null>(null);

  toggleOrder(orderId: string) {
    this.expandedOrder.update(curr => curr === orderId ? null : orderId);
  }

  isExpanded(orderId: string): boolean {
    return this.expandedOrder() === orderId;
  }

  // ── Step progress
  getStepIndex(status: OrderStatus): number {
    const map: Record<OrderStatus, number> = {
      'Processing':       1,
      'Shipped':          2,
      'Out for Delivery': 3,
      'Delivered':        4,
      'Cancelled':        -1,
    };
    return map[status] ?? 0;
  }

  isStepDone(stepIndex: number, status: OrderStatus): boolean {
    return stepIndex <= this.getStepIndex(status);
  }

  // ── Navigate to shop
  goToShop() { this.router.navigate(['/shop']); }
}