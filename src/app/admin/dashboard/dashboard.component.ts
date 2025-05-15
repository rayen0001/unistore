import { HeaderComponent } from '../header/header.component'; // Import HeaderComponent
import { SidebarComponent } from '../sidebar/sidebar.component'; // Import SidebarComponent
import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ensure the component is standalone
  imports: [
    RouterModule,
    HeaderComponent, // Add HeaderComponent to imports
    SidebarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent {}
