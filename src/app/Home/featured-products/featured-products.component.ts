import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css'
})
export class FeaturedProductsComponent implements OnInit, AfterViewInit {
  // Products split into rows
  firstRow: Product[] = [];
  secondRow: Product[] = [];
  thirdRow: Product[] = [];
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    // Initialize products
    const allProducts: Product[] = [
      { 
        name: 'Premium Headphones', 
        price: 249, 
        image: 'https://placehold.co/500x500/?text=Headphones' 
      },
      { 
        name: 'Smart Watch', 
        price: 199, 
        image: 'https://placehold.co/500x500/?text=Watch' 
      },
      { 
        name: 'Leather Wallet', 
        price: 89, 
        image: 'https://placehold.co/500x500/?text=Wallet' 
      },
      { 
        name: 'Designer Sunglasses', 
        price: 179, 
        image: 'https://placehold.co/500x500/?text=Sunglasses' 
      },
      { 
        name: 'Wireless Earbuds', 
        price: 149, 
        image: 'https://placehold.co/500x500/?text=Earbuds' 
      },
      { 
        name: 'Minimalist Backpack', 
        price: 129, 
        image: 'https://placehold.co/500x500/?text=Backpack' 
      },
      { 
        name: 'Portable Speaker', 
        price: 119, 
        image: 'https://placehold.co/500x500/?text=Speaker' 
      },
      { 
        name: 'Stylish Sneakers', 
        price: 159, 
        image: 'https://placehold.co/500x500/?text=Sneakers' 
      }
    ];
    
    // Split products into rows
    this.firstRow = allProducts.slice(0, 3);
    this.secondRow = allProducts.slice(3, 5);
    this.thirdRow = allProducts.slice(5, 8);
  }
  
  ngAfterViewInit(): void {
    // Add parallax effect to product cards
    this.initParallaxEffect();
  }
  
  initParallaxEffect(): void {
    const cards = this.elementRef.nativeElement.querySelectorAll('.product-card');
    
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      cards.forEach((card: HTMLElement) => {
        const rect = card.getBoundingClientRect();
        const cardX = (rect.left + rect.width / 2) / window.innerWidth;
        const cardY = (rect.top + rect.height / 2) / window.innerHeight;
        
        // Calculate distance from mouse to card center (normalized)
        const distX = x - cardX;
        const distY = y - cardY;
        
        // Apply subtle rotation based on mouse position
        // Only apply if mouse is relatively close to the card
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 0.3) {
          const rotateX = distY * 5; // Max 5 degrees
          const rotateY = -distX * 5; // Max 5 degrees
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
          card.style.transform = '';
        }
      });
    });
    
    // Reset transform when mouse leaves the window
    document.addEventListener('mouseleave', () => {
      cards.forEach((card: HTMLElement) => {
        card.style.transform = '';
      });
    });
  }
}