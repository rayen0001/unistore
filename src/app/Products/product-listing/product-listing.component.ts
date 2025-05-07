import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-product-listing',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 49.99,
      imageUrl: 'assets/images/product1.jpg',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      imageUrl: 'assets/images/product2.jpg',
      category: 'Clothing'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 39.99,
      imageUrl: 'assets/images/product3.jpg',
      category: 'Electronics'
    }
  ];
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Initialize component
  }
  
  viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}