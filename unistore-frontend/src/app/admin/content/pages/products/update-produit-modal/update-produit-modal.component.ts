import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit.model';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Add this for the select dropdown

@Component({
  selector: 'app-update-produit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule, // Add this for the select dropdown
  ],
  templateUrl: './update-produit-modal.component.html',
  styleUrls: ['./update-produit-modal.component.css'],
})
export class UpdateProduitModalComponent {
  productForm: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    public dialogRef: MatDialogRef<UpdateProduitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Produit; categories: any[] }
  ) {
    this.categories = data.categories;

    // Initialize the form with all required fields
    this.productForm = this.fb.group({
      name: [data.product.name, Validators.required],
      marque: [data.product.marque, Validators.required],
      description: [data.product.description, Validators.required],
      Prix: [data.product.Prix, [Validators.required, Validators.min(0)]],
      stock: [data.product.stock, [Validators.required, Validators.min(0)]],
      etat: [data.product.etat, Validators.required], // Assuming Etat is a string enum
      ref: [data.product.ref, Validators.required],
      category_id: [data.product.category?.id, Validators.required], // Use category_id for the foreign key
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    // Create the Produit object from the form values
    const produit: Produit = {
      ...this.productForm.value,
      id: this.data.product.id, // Preserve the product ID for update
      category: { id: this.productForm.value.category_id }, // Map category_id to the Category object
      images: this.data.product.images, // Preserve existing images
    };

    // Call the service to update the product
    this.produitService.updateProduit(this.data.product.id!, produit).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Submission error', error);
        // Optionally handle error (e.g., show error message)
      },
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