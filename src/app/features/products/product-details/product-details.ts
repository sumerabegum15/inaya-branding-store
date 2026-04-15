import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product';
import { ProductCard } from '../product-card/product-card';

export interface ProductDetail extends Product {
  sizes: string[];
  colors: string[];
  description: string;
  features: string[];
  stock: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {

  private route       = inject(ActivatedRoute);
  private router      = inject(Router);
  cartService         = inject(CartService);

  // ── All products (in real app this comes from ProductService/API)
  private allProducts: ProductDetail[] = [
    {
      id: 1, name: 'Sunny Dino Tee', category: 'Kids', price: 24.99,
      image: '🦕', bg: 'linear-gradient(135deg,#FFD166,#FFAA4C)',
      badge: 'New', rating: 4.8, reviews: 120, stock: 18,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'],
      colors: ['#FFD166','#FF6B6B','#6BCFB0','#74C7EC'],
      description: 'Let your little explorer roam freely in this super-soft Dino Tee! Made from 100% organic cotton, it\'s gentle on sensitive skin and tough enough for all-day adventures. Pre-shrunk and machine washable.',
      features: ['100% Organic Cotton','Machine Washable','Pre-shrunk','Hypoallergenic dye','Tagless for comfort'],
    },
    {
      id: 2, name: 'Rainbow Hoodie', category: 'Kids', price: 44.99,
      image: '🌈', bg: 'linear-gradient(135deg,#FF6B6B,#FFB3B3)',
      badge: 'Hot', rating: 4.9, reviews: 98, stock: 7,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'],
      colors: ['#FF6B6B','#FFD166','#6BCFB0','#5E2D79'],
      description: 'Bright, cozy and full of colour — this Rainbow Hoodie is a kid magnet! Crafted from a soft cotton-fleece blend with a kangaroo pocket and adjustable drawstring hood.',
      features: ['Cotton-Fleece blend','Kangaroo pocket','Adjustable hood','Ribbed cuffs & hem','Unisex fit'],
    },
    {
      id: 3, name: 'Ocean Shorts', category: 'Boys', price: 19.99,
      image: '🌊', bg: 'linear-gradient(135deg,#74C7EC,#4BA6D4)',
      badge: '', rating: 4.6, reviews: 64, stock: 24,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'],
      colors: ['#74C7EC','#2B2B3B','#FFD166'],
      description: 'Perfect for the beach or the playground, these Ocean Shorts dry fast and feel amazing. Elastic waistband with adjustable drawstring for the perfect fit.',
      features: ['Quick-dry fabric','Elastic waistband','Side pockets','UPF 30+ protection','Lightweight'],
    },
    {
      id: 4, name: 'Star Dress', category: 'Girls', price: 34.99,
      image: '⭐', bg: 'linear-gradient(135deg,#6BCFB0,#4BB89A)',
      badge: 'Sale', rating: 4.7, reviews: 87, stock: 12,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'],
      colors: ['#6BCFB0','#FFD166','#FF6B6B','#74C7EC'],
      description: 'Twirl-worthy and totally adorable, the Star Dress features a flared skirt and a comfortable cotton bodice. Perfect for parties, school or just everyday magic.',
      features: ['Flared A-line skirt','100% Cotton bodice','Side zip closure','Lining included','Machine washable'],
    },
    {
      id: 5, name: 'Cozy Joggers', category: 'Boys', price: 29.99,
      image: '🧸', bg: 'linear-gradient(135deg,#5E2D79,#9B6BB5)',
      badge: '', rating: 4.5, reviews: 55, stock: 20,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'],
      colors: ['#5E2D79','#2B2B3B','#74C7EC'],
      description: 'Ultra-soft joggers for maximum comfort during play, school or lounging. Tapered fit with elastic waistband and deep side pockets.',
      features: ['Fleece-lined interior','Elastic waistband','Deep side pockets','Tapered fit','Durable stitching'],
    },
    {
      id: 6, name: 'Butterfly Blouse', category: 'Women', price: 39.99,
      image: '🦋', bg: 'linear-gradient(135deg,#FFD166,#FF6B6B)',
      badge: 'New', rating: 4.8, reviews: 143, stock: 15,
      sizes: ['XS','S','M','L','XL'],
      colors: ['#FFD166','#FF6B6B','#6BCFB0','#FFFFFF'],
      description: 'Light, breezy and beautiful — the Butterfly Blouse features elegant flutter sleeves and a relaxed fit. Goes effortlessly from brunch to evening out.',
      features: ['Chiffon fabric','Flutter sleeves','Relaxed fit','V-neckline','Hand wash recommended'],
    },
    {
      id: 7, name: 'Classic Chinos', category: 'Men', price: 49.99,
      image: '👔', bg: 'linear-gradient(135deg,#2B2B3B,#5E2D79)',
      badge: '', rating: 4.6, reviews: 76, stock: 19,
      sizes: ['S','M','L','XL','XXL'],
      colors: ['#2B2B3B','#5E2D79','#74C7EC','#FFD166'],
      description: 'Sharp, comfortable and versatile. These Classic Chinos work for the office, a date night, or a casual weekend. Slim-tapered cut with a clean finish.',
      features: ['Stretch twill fabric','Slim-tapered fit','4-pocket design','Belt loops','Machine washable'],
    },
    {
      id: 8, name: 'Floral Skirt', category: 'Women', price: 32.99,
      image: '🌸', bg: 'linear-gradient(135deg,#FF6B6B,#6BCFB0)',
      badge: 'Sale', rating: 4.7, reviews: 102, stock: 9,
      sizes: ['XS','S','M','L','XL'],
      colors: ['#FF6B6B','#6BCFB0','#FFD166'],
      description: 'A flowy midi skirt with an all-over floral print. The elastic waistband makes it a dream to wear all day long. Pairs beautifully with anything in your wardrobe.',
      features: ['Floral print','Midi length','Elastic waistband','Lined','Dry clean recommended'],
    },
    {
      id: 9,  name: 'Denim Jacket',      category: 'Kids',  price: 54.99, image: '🧥', bg: 'linear-gradient(135deg,#74C7EC,#5E2D79)', badge: 'New',  rating: 4.8, reviews: 61,  stock: 11,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'], colors: ['#74C7EC','#2B2B3B'],
      description: 'A timeless denim jacket your kid will reach for every day. Soft-washed for a lived-in feel with reinforced elbows and snug button cuffs.',
      features: ['Soft-washed denim','Button front','Chest pockets','Reinforced elbows','Machine washable'],
    },
    {
      id: 10, name: 'Sunshine Jumpsuit', category: 'Girls', price: 38.99, image: '☀️', bg: 'linear-gradient(135deg,#FFD166,#6BCFB0)', badge: '',     rating: 4.5, reviews: 48,  stock: 16,
      sizes: ['2Y','4Y','6Y','8Y','10Y','12Y'], colors: ['#FFD166','#6BCFB0','#FF6B6B'],
      description: 'One piece, endless fun. This Sunshine Jumpsuit is easy to put on and impossible to take off. Soft linen blend for all-day comfort.',
      features: ['Linen-cotton blend','Snap buttons','Side pockets','Relaxed fit','Machine washable'],
    },
    {
      id: 11, name: 'Sport Polo',        category: 'Men',   price: 29.99, image: '🏃', bg: 'linear-gradient(135deg,#6BCFB0,#74C7EC)', badge: '',     rating: 4.4, reviews: 39,  stock: 22,
      sizes: ['S','M','L','XL','XXL'], colors: ['#6BCFB0','#FFFFFF','#2B2B3B'],
      description: 'Moisture-wicking and breathable, the Sport Polo is built for the active man. Flat-knit collar and a classic 3-button placket.',
      features: ['Moisture-wicking','Breathable mesh','3-button placket','Flat-knit collar','Machine washable'],
    },
    {
      id: 12, name: 'Cozy Cardigan',     category: 'Women', price: 44.99, image: '🧶', bg: 'linear-gradient(135deg,#FF6B6B,#FFD166)', badge: 'Hot',  rating: 4.9, reviews: 117, stock: 6,
      sizes: ['XS','S','M','L','XL'], colors: ['#FF6B6B','#FFD166','#6BCFB0','#5E2D79'],
      description: 'Wrap yourself in warmth with this chunky-knit cardigan. Oversized fit with deep pockets — perfect for cozy mornings or cool evenings.',
      features: ['Chunky-knit','Oversized fit','Deep side pockets','Button front','Hand wash only'],
    },
  ];

  // ── Component state
  product  = signal<ProductDetail | null>(null);
  notFound = signal(false);

  selectedSize  = signal<string>('');
  selectedColor = signal<string>('');
  qty           = signal<number>(1);
  isWishlisted  = signal(false);
  addedToCart   = signal(false);
  activeTab     = signal<'description' | 'features'>('description');

  // ── Related products (same category, excluding current)
  relatedProducts = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.allProducts
      .filter(item => item.category === p.category && item.id !== p.id)
      .slice(0, 4);
  });

  // ── Stock warning
  lowStock = computed(() => {
    const p = this.product();
    return p ? p.stock <= 8 : false;
  });

  // ── Stars
  getStars(rating: number): string {
    return '⭐'.repeat(Math.floor(rating));
  }

  // ── Badge class
  getBadgeClass(badge: string): string {
    const map: Record<string, string> = { 'New': 'badge--new', 'Hot': 'badge--hot', 'Sale': 'badge--sale' };
    return map[badge] ?? '';
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.allProducts.find(p => p.id === id);
    if (found) {
      this.product.set(found);
      this.selectedSize.set(found.sizes[0]);
      this.selectedColor.set(found.colors[0]);
    } else {
      this.notFound.set(true);
    }
  }

  // ── Qty controls
  increaseQty() { this.qty.update(q => Math.min(q + 1, this.product()?.stock ?? 10)); }
  decreaseQty() { this.qty.update(q => Math.max(1, q - 1)); }

  // ── Add to cart
  addToCart() {
    const p = this.product();
    if (!p || !this.selectedSize()) return;

    for (let i = 0; i < this.qty(); i++) {
      this.cartService.addToCart(p);
    }

    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  // ── Toggle wishlist
  toggleWishlist() {
    this.isWishlisted.update(v => !v);
  }

  // ── Navigate back
  goBack() { this.router.navigate(['/shop']); }

  // ── Navigate to related product
  goToProduct(id: number) {
    this.router.navigate(['/product', id]);
    // reset selections
    const found = this.allProducts.find(p => p.id === id);
    if (found) {
      this.product.set(found);
      this.selectedSize.set(found.sizes[0]);
      this.selectedColor.set(found.colors[0]);
      this.qty.set(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}