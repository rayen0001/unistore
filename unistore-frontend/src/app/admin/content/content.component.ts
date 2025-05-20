// content.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true, // Ensure the component is standalone
  imports: [RouterModule], // Import RouterModule
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ContentComponent {
username=localStorage.getItem('username')
}