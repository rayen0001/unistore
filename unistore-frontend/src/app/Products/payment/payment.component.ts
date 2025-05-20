import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  cartItems:any
  constructor(private cartService:CartService){}
  total:any
 ngOnInit(): void {
  this.total=this.cartService.getTotal()
 this. getItems()
  // Toggle payment methods
  const paymentOptions = document.querySelectorAll('.payment-option');

  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active class from all options
      paymentOptions.forEach(opt => opt.classList.remove('active'));

      // Add active class to clicked option
      option.classList.add('active');

      // Show/hide appropriate payment form
      const paymentMethodInput = option.querySelector('input');
      if (paymentMethodInput) {
        const paymentMethod = (paymentMethodInput as HTMLInputElement).value;
        console.log('Selected payment method:', paymentMethod);
      }
    });
  });

  // Format credit card number with spaces
  const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formattedValue = '';

      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
      }

      target.value = formattedValue;
    });
  }

  // Format expiry date
  const expiryInput = document.getElementById('expiry-date') as HTMLInputElement;
  if (expiryInput) {
    expiryInput.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\D/g, '');

      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }

      target.value = value;
    });
  }
}
getItems(){
  this.cartItems= this.cartService.getCartItems()
}

}
