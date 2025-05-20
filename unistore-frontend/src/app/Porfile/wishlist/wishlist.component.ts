import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  isShareModalOpen: boolean = false;
  shareableLink: string = '';
  
  constructor() { }

  ngOnInit(): void {
    // Load wishlist items from cookies when component initializes
    this.loadWishlistFromCookies();
    
    // Check if this is a shared wishlist (from URL parameters)
    this.checkForSharedWishlist();
    
    // Generate shareable link
    this.generateShareableLink();
  }
  
  /**
   * Load wishlist items from cookies
   */
  loadWishlistFromCookies(): void {
    const wishlistCookie = this.getCookie('unistore_wishlist');
    if (wishlistCookie) {
      try {
        this.wishlistItems = JSON.parse(wishlistCookie);
      } catch (error) {
        console.error('Error parsing wishlist cookie:', error);
        this.wishlistItems = [];
      }
    } else {
      // Sample data for demonstration
      this.wishlistItems = [
        {
          id: 1,
          name: 'Wireless Noise-Cancelling Headphones',
          price: 199.99,
          image: '/placeholder.svg?height=200&width=280',
          inStock: true
        },
        {
          id: 2,
          name: 'Smart Fitness Tracker',
          price: 89.99,
          image: '/placeholder.svg?height=200&width=280',
          inStock: true
        },
        {
          id: 3,
          name: 'Ultra-Slim Laptop Stand',
          price: 49.99,
          image: '/placeholder.svg?height=200&width=280',
          inStock: false
        }
      ];
      
      // Save sample data to cookies
      this.saveWishlistToCookies();
    }
  }
  
  /**
   * Save current wishlist to cookies
   */
  saveWishlistToCookies(): void {
    const wishlistJson = JSON.stringify(this.wishlistItems);
    // Set cookie to expire in 30 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    
    document.cookie = `unistore_wishlist=${wishlistJson}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }
  
  /**
   * Get cookie value by name
   */
  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  
  /**
   * Check if URL contains shared wishlist data
   */
  checkForSharedWishlist(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedWishlist = urlParams.get('wishlist');
    
    if (sharedWishlist) {
      try {
        // Decode and parse the shared wishlist data
        const decodedData = atob(sharedWishlist);
        const sharedItems: WishlistItem[] = JSON.parse(decodedData);
        
        // Merge with existing wishlist (avoiding duplicates)
        for (const item of sharedItems) {
          if (!this.wishlistItems.some(existing => existing.id === item.id)) {
            this.wishlistItems.push(item);
          }
        }
        
        // Save the updated wishlist
        this.saveWishlistToCookies();
        
        // Remove the query parameter from URL to prevent reloading on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Error processing shared wishlist:', error);
      }
    }
  }
  
  /**
   * Remove item from wishlist
   */
  removeFromWishlist(itemId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
    this.saveWishlistToCookies();
  }
  
  /**
   * Add item to cart
   */
  addToCart(item: WishlistItem): void {
    // In a real application, this would call a cart service
    console.log('Adding to cart:', item);
    
    // Show confirmation (in a real app, use a toast or notification)
    alert(`${item.name} added to your cart!`);
  }
  
  /**
   * Open share modal
   */
  shareWishlist(): void {
    this.isShareModalOpen = true;
    this.generateShareableLink();
  }
  
  /**
   * Close share modal
   */
  closeShareModal(): void {
    this.isShareModalOpen = false;
  }
  
  /**
   * Generate shareable link with encoded wishlist data
   */
  generateShareableLink(): void {
    // Encode wishlist data to base64
    const wishlistData = JSON.stringify(this.wishlistItems);
    const encodedData = btoa(wishlistData);
    
    // Create shareable URL
    this.shareableLink = `${window.location.origin}${window.location.pathname}?wishlist=${encodedData}`;
  }
  
  /**
   * Copy shareable link to clipboard
   */
  copyShareLink(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    
    // Show confirmation (in a real app, use a toast or notification)
    alert('Link copied to clipboard!');
  }
  
  /**
   * Share on Facebook
   */
  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareableLink)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }
  
  /**
   * Share on Twitter
   */
  shareOnTwitter(): void {
    const text = 'Check out my UniStore wishlist!';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareableLink)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }
  
  /**
   * Share on WhatsApp
   */
  shareOnWhatsApp(): void {
    const text = 'Check out my UniStore wishlist!';
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + this.shareableLink)}`;
    window.open(url, '_blank');
  }
  
  /**
   * Share via Email
   */
  shareViaEmail(): void {
    const subject = 'Check out my UniStore wishlist!';
    const body = `I wanted to share my UniStore wishlist with you: ${this.shareableLink}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }
}