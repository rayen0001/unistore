import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ProduitService } from '../../admin/content/pages/products/produit.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface ProductImage {
  id:any
  image_url: string;
  is_primary: boolean;
}

interface Product {
id: any;
  name: string;
  Prix: number;
  images: ProductImage[];
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
  allproducts:any
  constructor(private elementRef: ElementRef,private productService:ProduitService,private router:Router,private cartService:CartService) {}
  
  ngOnInit(): void {
    // Initialize products
    this.getProduits()

 
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


  getProduits(){
    return this.productService.getProduits().subscribe({
      next:(res)=>{console.log(res);
      this.allproducts=res
      },
      error:(err)=>{console.log(err);
      },
      complete:()=>{   const allProducts: Product[] = this.allproducts;
        // Split products into rows
        this.firstRow = allProducts.slice(0, 3);
        this.secondRow = allProducts.slice(3, 5);
        this.thirdRow = allProducts.slice(5, 8);}
    })
  }

  productDetail(event:any){
    this.router.navigate(["/product/"+event.target.id])
  }
  addToCart(product:any){
  this.cartService.addToCart(product)
}
}