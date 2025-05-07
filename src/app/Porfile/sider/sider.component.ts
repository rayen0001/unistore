import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss'] // <-- fixed here
})
export class SiderComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/avatar.jpg'
  };

  navItems = [
    { 
      title: 'My Account', 
      icon: 'user', 
      route: '/profile/account',
      active: false
    },
    { 
      title: 'Orders', 
      icon: 'shopping-bag', 
      route: '/profile/orders',
      active: false,
      badge: 3
    },
    { 
      title: 'Wishlist', 
      icon: 'heart', 
      route: '/profile/wishlist',
      active: false,
      badge: 5
    }
  ];
  

  collapsed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveRoute();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveRoute();
      });
  }

  updateActiveRoute() {
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      item.active = currentUrl === item.route;
    });
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
