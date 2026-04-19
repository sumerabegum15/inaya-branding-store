import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export type ProfileTab = 'profile' | 'address' | 'payment' | 'wishlist';

interface Address { label: string; address: string; isDefault: boolean; }
interface Card    { type: string; last: string; expiry: string; }

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

  private fb     = inject(FormBuilder);
  private router = inject(Router);

  activeTab = signal<ProfileTab>('profile');
  saved     = signal(false);

  // ── Profile form
  profileForm: FormGroup = this.fb.group({
    firstName: ['Sarah',              [Validators.required]],
    lastName:  ['Johnson',            [Validators.required]],
    email:     ['sarah@email.com',    [Validators.required, Validators.email]],
    phone:     ['+1 234 567 8900',    []],
    dob:       ['1990-05-15',         []],
  });

  // ── Sidebar tabs
  tabs = [
    { key: 'profile',  label: '👤 My Profile',       },
    { key: 'address',  label: '📍 Addresses',         },
    { key: 'payment',  label: '💳 Payment Methods',   },
    { key: 'wishlist', label: '❤️ Wishlist',          },
  ];

  // ── Addresses
  addresses: Address[] = [
    { label: 'Home', address: '123 Maple Street, New York, NY 10001', isDefault: true  },
    { label: 'Work', address: '456 Oak Avenue, Brooklyn, NY 11201',   isDefault: false },
  ];

  // ── Cards
  cards: Card[] = [
    { type: 'Visa',       last: '4242', expiry: '12/27' },
    { type: 'Mastercard', last: '8888', expiry: '09/26' },
  ];

  // ── Wishlist (sample products)
  wishlistItems = [
    { id: 1, name: 'Sunny Dino Tee',   price: 24.99, emoji: '🦕', bg: 'linear-gradient(135deg,#FFD166,#FFAA4C)' },
    { id: 2, name: 'Rainbow Hoodie',   price: 44.99, emoji: '🌈', bg: 'linear-gradient(135deg,#FF6B6B,#FFB3B3)' },
    { id: 4, name: 'Star Dress',       price: 34.99, emoji: '⭐', bg: 'linear-gradient(135deg,#6BCFB0,#4BB89A)' },
    { id: 6, name: 'Butterfly Blouse', price: 39.99, emoji: '🦋', bg: 'linear-gradient(135deg,#FFD166,#FF6B6B)' },
  ];

  // ── Save profile
  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    // TODO: wire up to AuthService/API
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2000);
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.profileForm.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }

  // ── Sign out
  signOut() {
    // TODO: clear auth token/session via AuthService
    this.router.navigate(['/login']);
  }

  // ── Set default address
  setDefault(index: number) {
    this.addresses = this.addresses.map((a, i) => ({ ...a, isDefault: i === index }));
  }

  // ── Remove wishlist item
  removeWishlist(id: number) {
    this.wishlistItems = this.wishlistItems.filter(i => i.id !== id);
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}