import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() {
    this.loadCart();
  }

  private cartItems: any[] = [];

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const data = localStorage.getItem(this.cartKey);
    this.cartItems = data ? JSON.parse(data) : [];
  }

 addToCart(product: any) {
  // Check if the product is already in the cart
  const existingProduct = this.cartItems.find(item => item.id === product.id);

  if (existingProduct) {
    // If the product is already in the cart, increase the quantity by 1
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, add it with quantity set to 1
  product.quantity = 1;

    this.cartItems.push(product);
  }

  // Save the updated cart
  this.saveCart();
}


  getCartItems() {
    return this.cartItems;
  }

 removeFromCart(item: any) {
  const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
  if (index > -1) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }
}

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.Prix, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
  getCartItemCount(): number {
  return this.cartItems.length;
}
}
