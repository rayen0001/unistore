import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProduitService } from './produit.service';
import { Produit } from './produit.model';
import { CategoryService } from '../categories/category.service';
import { AddProduitModalComponent } from './add-produit-modal/add-produit-modal.component';
import { UpdateProduitModalComponent } from './update-produit-modal/update-produit-modal.component';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Add Snackbar for notifications

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule, // Add Snackbar module
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'stock','marque','etat', 'actions']; // Added 'stock' column
  dataSource: Produit[] = [];
  categories: any[] = [];

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Inject Snackbar for notifications
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.showSnackbar('Failed to load products. Please try again.');
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        this.showSnackbar('Failed to load categories. Please try again.');
      },
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProduitModalComponent, {
      width: '90vw',
      data: { categories: this.categories },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProduits(); // Refresh the table after adding
        this.showSnackbar('Product added successfully!');
      }
    });
  }

  openEditModal(product: Produit): void {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  
    // Pass data inside the dialogConfig object
    dialogConfig.data = { product, categories: this.categories };
  
    const dialogRef = this.dialog.open(UpdateProduitModalComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProduits(); // Refresh the table after updating
        this.showSnackbar('Product updated successfully!');
      }
    });
  }
  

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => {
          this.loadProduits(); // Refresh the table after deleting
          this.showSnackbar('Product deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.showSnackbar('Failed to delete product. Please try again.');
        },
      });
    }
  }

  // Helper method to show snackbar notifications
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center', // Fixed typo
      verticalPosition: 'bottom',  // Fixed typo
    });
  }
  
}