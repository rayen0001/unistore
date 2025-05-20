import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatDialogModule], // Add MatDialogModule here
  template: `
    <h2 mat-dialog-title>Add Category</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput [(ngModel)]="categoryName" placeholder="Category Name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
})
export class AddCategoryModalComponent {
  categoryName = '';

  constructor(private dialogRef: MatDialogRef<AddCategoryModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.categoryName);
  }
}