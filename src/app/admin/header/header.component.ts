import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class HeaderComponent {
  constructor(private router: Router) {}
  username=localStorage.getItem('username')
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token
    this.router.navigate(['']); // Redirect to the login page
  }
}