import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartService } from '../../services/cart.service';
import { findIndex } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  Prix: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class CartComponent implements OnInit{
    @Input() items: any[] = [];

  constructor(private cartService:CartService){}
  ngOnInit(): void {
this.items=this.cartService.getCartItems()

}

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.Prix * item.quantity, 0);
  }

  removeItem(item: any): void {
   
    this.cartService.removeFromCart(item)
  }
}
