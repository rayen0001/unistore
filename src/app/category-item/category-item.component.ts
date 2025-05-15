import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
interface CategoryNode {
  id: number;
  label: string;
  parent?: CategoryNode | null;
  children?: CategoryNode[];
}
@Component({
  selector: 'app-category-item',
  imports: [CommonModule,RouterModule],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css'
})
export class CategoryItemComponent {
  @Input() category!: CategoryNode;
constructor(){}
}
