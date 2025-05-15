import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../../admin/content/pages/products/produit.service';
import { CartService } from '../../services/cart.service';
interface Category{
  id:any,
  label:string
}

interface ProductImage {
  id:any
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: any;
  name: string;
  description: string;
  Prix: number;
  images: ProductImage[];
  category: Category;
}

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId:any
  product:any
  
  relatedProducts: Product[] = [
    {
      id: 2,
      name: 'Related Product 1',
      description: 'Related product description',
      Prix: 29.99,
 images: [{
        id: 1,
        image_url: 'assets/images/product2.jpg',
        is_primary: false
      }
      ],      category: {
        id:1,
        label:'Electrinics'
      }
    },
    {
      id: 3,
      name: 'Related Product 2',
      description: 'Related product description',
      Prix: 39.99,
 images: [{
        id: 1,
        image_url: 'assets/images/product2.jpg',
        is_primary: false
      }
      ],category: {
        id:1,
        label:'Electrinics'
      }    }
  ];
  
  quantity = 1;
  
constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService:CartService,
private productService:ProduitService  ) {}  
  ngOnInit(): void {
       this.productId = this.route.snapshot.paramMap.get('id');
 if (this.productId) {
      this.getById();
    }
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
  getById(){
    return this.productService.getProduit(this.productId).subscribe({
      next:(res)=>{this.product=res;console.log(this.product);
      
      },
      error:(err)=>{console.log(err);
      },
      complete:()=>{   }
    })
  }
  addToCart(product:any){
    product.quantity=this.quantity
  this.cartService.addToCart(product)
}
}