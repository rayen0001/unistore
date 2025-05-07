import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [FormsModule, NgClass,CommonModule] ,
  templateUrl: './forgot-password-modal.component.html',
  styleUrl: './forgot-password-modal.component.css'
})
export class ForgotPasswordModalComponent {
  isOpen: boolean = false;
  email: string = '';
  constructor(

  ){}
  @Output() close = new EventEmitter<void>();

  openModal(): void {
    this.isOpen = true;
    document.body.classList.add('modal-open'); 
  }

  closeModal(): void {
    this.isOpen = false;
    this.close.emit();
  }

  onSubmit(): void {
    if (!this.email) {

      return;
    }

    const data = { email: this.email };

    // this.authService.resetPassword(data).subscribe(
    //   (response: any) => {
    //     console.log('Reset password email sent successfully:', response);
    //     this.snackbarService.success('A reset password link has been sent to your email.');
    //     this.closeModal();
    //   },
    //   (error: any) => {
    //     console.error('Error sending reset password email:', error);
    //     this.snackbarService.error('Failed to send reset password email. Please try again.');
    //   }
    // );
  }
}
