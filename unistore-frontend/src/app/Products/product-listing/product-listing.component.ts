import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProduitService } from '../../admin/content/pages/products/produit.service';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

@Component({
  selector: 'app-product-listing',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
    categoryId: any;


  products:any
  
  constructor(private router: Router,private route:ActivatedRoute,private productService:ProduitService,private cartService:CartService) {}
  
  ngOnInit(): void {
  this.categoryId = this.route.snapshot.paramMap.get('id');
 if (this.categoryId) {
      this.getByCategory();
    } else{
     this.getAll()
    }
  
  }
  
  viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  getByCategory(){
return this.productService.getProduitByCategory(this.categoryId).subscribe({
  next:(res)=>{console.log(res);
    this.products=res
  },
error:(err)=>{console.log(err);
}
})
  }

  getAll(){
    return this.productService.getProduits().subscribe({
  next:(res)=>{console.log(res);
    this.products=res
  },
error:(err)=>{console.log(err);
}
})
  }
addToCart(product:any){
  this.cartService.addToCart(product)
}
  count(){
    return this.cartService.getCartItemCount()
  }
}