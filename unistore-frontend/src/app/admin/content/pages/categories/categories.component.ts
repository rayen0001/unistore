import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCategoryModalComponent } from './add-category-modal.component';
import { AddSubcategoryModalComponent } from './add-subcategory-modal.component';

interface CategoryNode {
  id: number;
  label: string;
  children?: CategoryNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  label: string;
  level: number;
  id: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private _transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      label: node.label,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.dataSource.data = this.buildTree(data);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  buildTree(categories: any[]): CategoryNode[] {
    const map = new Map<number, CategoryNode>();
    const roots: CategoryNode[] = [];

    categories.forEach((category) => {
      map.set(category.id, { ...category, children: [] });
    });

    categories.forEach((category) => {
      if (category.parent) {
        const parent = map.get(category.parent.id);
        if (parent) {
          parent.children!.push(map.get(category.id)!);
        }
      } else {
        roots.push(map.get(category.id)!);
      }
    });

    return roots;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  openAddCategoryModal() {
    const dialogRef = this.dialog.open(AddCategoryModalComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newCategory = {
          label: result,
          parent: null,
          children: [],
        };
        this.categoryService.createCategory(newCategory).subscribe(() => {
          this.fetchCategories(); // Refresh the tree
        });
      }
    });
  }

  openAddSubcategoryModal(parentId: number) {
    const dialogRef = this.dialog.open(AddSubcategoryModalComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newSubcategory = {
          label: result,
          parent: { id: parentId },
          children: [],
        };
        this.categoryService.createCategory(newSubcategory).subscribe(() => {
          this.fetchCategories(); // Refresh the tree
        });
      }
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.fetchCategories(); // Refresh the tree
    });
  }
}