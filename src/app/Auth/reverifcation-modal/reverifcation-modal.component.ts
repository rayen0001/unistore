import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reverifcation-modal',
  imports: [FormsModule, NgClass,CommonModule] ,
  templateUrl: './reverifcation-modal.component.html',
  styleUrl: './reverifcation-modal.component.css'
})
export class ReverifcationModalComponent {
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

    // this.authService.reverify(data).subscribe(
    //   (response: any) => {
    //     console.log('Verification email sent successfully:', response);
    //     this.snackbarService.success('A reverificationlink has been sent to your email.');
    //     this.closeModal();
    //   },
    //   (error: any) => {
    //     console.error('Error sending verification email:', error);
    //     this.snackbarService.error('Failed to send verification email. Please try again.');
    //   }
    // );
  }
}
