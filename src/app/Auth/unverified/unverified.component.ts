import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';
@Component({
  selector: 'app-unverified',
  standalone: true, // Mark as standalone component
  imports: [CommonModule], // Import CommonModule for ngIf, ngFor, etc.
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.css']
})
export class UnverifiedComponent {
  email: string | undefined;

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private authService: AuthService // Properly inject AuthService
  ) {
    this.decodeToken();
  }

  /**
   * Decode the JWT token to extract the user's email.
   */
  decodeToken(): void {
    const token = localStorage.getItem('regtoken');

    if (token) {
      try {
        const decoded: any = jwtDecode(token); // Decode the token
        if (decoded && decoded.email) {
          this.email = decoded.email; // Use decoded.email instead of decoded.username
          console.log('Decoded email:', this.email);
        } else {
          console.log('Email not found in token');
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.log('No token found');
    }
  }

  /**
   * Resend the verification email.
   */
  resend(): void { if (!this.email) {
    this.snackbarService.info('Please enter your email address.');
    return;
  }

  const data = { email: this.email };

  this.authService.reverify(data).subscribe(
    (response: any) => {
      console.log('Verification email sent successfully:', response);
      this.snackbarService.success('A reverificationlink has been sent to your email.');
    },
    (error: any) => {
      console.error('Error sending verification email:', error);
      this.snackbarService.error('Failed to send verification email. Please try again.');
    }
  );
  }
}