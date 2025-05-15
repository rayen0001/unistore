import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit.model';
import { ImageService } from './image.service'; // Import the ImageService

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-produit-modal',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './add-produit-modal.component.html',
  styleUrls: ['./add-produit-modal.component.css'],
})
export class AddProduitModalComponent {
  productForm: FormGroup;
  categories: any[] = [];
  selectedFiles: File[] = []; // Store selected files

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private produitService: ProduitService,
    private imageService: ImageService, // Inject the ImageService
    public dialogRef: MatDialogRef<AddProduitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any[] }
  ) {
    this.categories = data.categories;

    // Initialize the form with all required fields
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      marque: ['', Validators.required],
      description: ['', Validators.required],
      Prix: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      etat: ['', Validators.required],
      ref: ['', Validators.required],
      category_id: [null, Validators.required],
    });
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files); // Convert FileList to an array
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    // Create the Produit object from the form values
    const produit: Produit = {
      ...this.productForm.value,
      category: { id: this.productForm.value.category_id },
      images: [], // Initialize images as an empty array
    };

    // Call the service to create the product
    this.produitService.createProduit(produit).subscribe({
      next: (createdProduct) => {
        this.showSnackbar('Product added successfully!');

        // Upload images if files are selected
        if (this.selectedFiles.length > 0) {
          this.imageService
            .uploadBulkImages(createdProduct.id!, this.selectedFiles)
            .subscribe({
              next: () => {
                this.showSnackbar('Images uploaded successfully!');
                this.dialogRef.close(true);
              },
              error: (error) => {
                console.error('Image upload error', error);
                this.showSnackbar('Failed to upload images. Please try again.');
              },
            });
        } else {
          this.dialogRef.close(true);
        }
      },
      error: (error) => {
        console.error('Submission error', error);
        this.showSnackbar('Failed to add product. Please try again.');
      },
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}