// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faSearch, 
  faShoppingCart, 
  faUser, 
  faSignInAlt 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class HeaderComponent {
  title = 'UniStore';
  cartItems = 0;
  
  // FontAwesome icons
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faUser = faUser;
  faSignInAlt = faSignInAlt;
  
  constructor() { }
  
  onSearch(searchTerm: string): void {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  }
}