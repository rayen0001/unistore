import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
    // You can add any initialization logic here
    // For example, fetching dynamic footer content from an API
  }

  // Method to handle newsletter subscription
  onSubscribe(event: Event): void {
    event.preventDefault();
    // Add your newsletter subscription logic here
    console.log('Newsletter subscription requested');
  }
}