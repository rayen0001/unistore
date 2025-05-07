import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: 1,
    name: 'Sample Product',
    description: 'This is a sample product description. It would contain details about the product features and benefits.',
    price: 49.99,
    imageUrl: 'assets/images/product1.jpg',
    category: 'Electronics'
  };
  
  relatedProducts: Product[] = [
    {
      id: 2,
      name: 'Related Product 1',
      description: 'Related product description',
      price: 29.99,
      imageUrl: 'assets/images/product2.jpg',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Related Product 2',
      description: 'Related product description',
      price: 39.99,
      imageUrl: 'assets/images/product3.jpg',
      category: 'Electronics'
    }
  ];
  
  quantity = 1;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      // In a real app, you would fetch the product by ID
      // this.loadProductDetails(productId);
    });
  }
  
  increaseQuantity(): void {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}