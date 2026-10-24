import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  searchTerm = '';
  selectedCategory = 'All';
  sortBy = 'featured';
  cartOpen = false;
  mobileMenuOpen = false;
  notice = '';
  wishlist = new Set<number>();
  cart = new Map<number, number>();

  categories = ['All', 'Electronics', 'Home', 'Fashion', 'Beauty', 'Sports'];

  products: Product[] = [
    { id: 1, name: 'Studio Wireless Headphones', category: 'Electronics', price: 3499, oldPrice: 4999, rating: 4.8, reviews: 2481, badge: 'BESTSELLER', image: 'photo-1505740420928-5e560c06d30e', color: '#f8e8d2', description: 'Rich sound, all-day comfort and up to 40 hours of listening.' },
    { id: 2, name: 'Minimal Ceramic Table Lamp', category: 'Home', price: 1899, oldPrice: 2499, rating: 4.6, reviews: 863, badge: '−24%', image: 'photo-1507473885765-e6ed057f782c', color: '#e7e6df', description: 'A warm, ambient glow for quiet evenings and cozy corners.' },
    { id: 3, name: 'Everyday Canvas Sneakers', category: 'Fashion', price: 2299, oldPrice: 2999, rating: 4.5, reviews: 1320, badge: 'POPULAR', image: 'photo-1542291026-7eec264c27ff', color: '#f7e4e0', description: 'Lightweight everyday sneakers with a clean, versatile silhouette.' },
    { id: 4, name: 'Smart Fitness Watch', category: 'Electronics', price: 4299, oldPrice: 5999, rating: 4.7, reviews: 3144, badge: 'TOP RATED', image: 'photo-1523275335684-37898b6baf30', color: '#e3e9ed', description: 'Track activity, sleep and daily goals from your wrist.' },
    { id: 5, name: 'Daily Hydration Bottle', category: 'Sports', price: 799, oldPrice: 1099, rating: 4.4, reviews: 574, badge: 'ECO PICK', image: 'photo-1602143407151-7111542de6e8', color: '#dcebe7', description: 'A reusable insulated bottle made for commutes and weekend trips.' },
    { id: 6, name: 'Botanical Skin Care Set', category: 'Beauty', price: 1499, oldPrice: 1999, rating: 4.6, reviews: 956, badge: '−25%', image: 'photo-1608248543803-ba4f8c70ae0b', color: '#f0e4df', description: 'A simple daily routine with gentle, plant-inspired essentials.' },
    { id: 7, name: 'Compact Bluetooth Speaker', category: 'Electronics', price: 1599, oldPrice: 2199, rating: 4.5, reviews: 1772, badge: 'TRENDING', image: 'photo-1608043152269-423dbba4e7e1', color: '#e0e5eb', description: 'Portable sound with punchy bass for home or outdoor hangs.' },
    { id: 8, name: 'Soft Knit Throw Blanket', category: 'Home', price: 1299, oldPrice: 1799, rating: 4.8, reviews: 688, badge: 'COZY PICK', image: 'photo-1600369671236-e74521d4b6ad', color: '#e8e2d9', description: 'A soft textured layer for the sofa, bed or reading nook.' },
    { id: 9, name: 'Classic Everyday Backpack', category: 'Fashion', price: 1999, oldPrice: 2699, rating: 4.6, reviews: 1092, badge: 'FAN FAVORITE', image: 'photo-1553062407-98eeb64c6a62', color: '#e1e6df', description: 'Thoughtful storage and a streamlined shape for busy days.' },
    { id: 10, name: 'Pour-Over Coffee Set', category: 'Home', price: 999, oldPrice: 1399, rating: 4.7, reviews: 421, badge: 'GIFT IDEA', image: 'photo-1495474472287-4d71bcdd2085', color: '#eee3d5', description: 'Make a slow morning ritual out of your favorite coffee.' },
    { id: 11, name: 'Wireless Over-Ear Earbuds', category: 'Electronics', price: 2799, oldPrice: 3599, rating: 4.3, reviews: 831, badge: 'NEW', image: 'photo-1606220945770-b5b6c2c55bf1', color: '#e5e7eb', description: 'Pocket-friendly audio with reliable wireless connectivity.' },
    { id: 12, name: 'Modern Desk Organizer', category: 'Home', price: 649, oldPrice: 899, rating: 4.4, reviews: 305, badge: 'DESK UPGRADE', image: 'photo-1499951360447-b19be8fe80f5', color: '#e5e2db', description: 'Keep your workspace tidy with a simple, functional design.' }
  ];

  get filteredProducts(): Product[] {
    let list = this.products.filter(p =>
      (this.selectedCategory === 'All' || p.category === this.selectedCategory) &&
      (p.name.toLowerCase().includes(this.searchTerm.toLowerCase().trim()) ||
       p.category.toLowerCase().includes(this.searchTerm.toLowerCase().trim()))
    );
    if (this.sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    if (this.sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    if (this.sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }

  get cartCount(): number {
    return [...this.cart.values()].reduce((sum, qty) => sum + qty, 0);
  }

  get cartItems(): { product: Product; quantity: number }[] {
    return [...this.cart.entries()].map(([id, quantity]) => ({
      product: this.products.find(p => p.id === id)!, quantity
    })).filter(item => !!item.product);
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get savings(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.oldPrice - item.product.price) * item.quantity, 0);
  }

  money(value: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.mobileMenuOpen = false;
  }

  toggleWishlist(id: number): void {
    if (this.wishlist.has(id)) this.wishlist.delete(id);
    else this.wishlist.add(id);
    this.wishlist = new Set(this.wishlist);
  }

  addToCart(product: Product): void {
    this.cart.set(product.id, (this.cart.get(product.id) ?? 0) + 1);
    this.cart = new Map(this.cart);
    this.notice = `${product.name} added to your cart`;
    setTimeout(() => this.notice = '', 2600);
  }

  changeQuantity(id: number, change: number): void {
    const next = (this.cart.get(id) ?? 0) + change;
    if (next <= 0) this.cart.delete(id);
    else this.cart.set(id, next);
    this.cart = new Map(this.cart);
  }

  removeFromCart(id: number): void {
    this.cart.delete(id);
    this.cart = new Map(this.cart);
  }

  checkout(): void {
    this.cartOpen = false;
    this.notice = 'Demo checkout ready — connect a payment provider to accept orders.';
    setTimeout(() => this.notice = '', 3500);
  }

  scrollToProducts(): void {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }
}
