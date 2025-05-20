import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token!: string; // Reset token from the URL
  password: string = ''; // New password
  confirmPassword: string = ''; // Confirm new password
  errorMessage: string = ''; // Error message to display
  showPassword: boolean = false; // Toggle password visibility
  showConfirmPassword: boolean = false; // Toggle confirm password visibility

  constructor(
    private route: ActivatedRoute, // To access query parameters
    private authService: AuthService, // Service for API calls
    private router: Router, // For navigation
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Extract the token from the URL query parameters
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.errorMessage = 'Invalid or expired reset link.';
    }
  }

  /**
   * Toggle the visibility of the password field.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle the visibility of the confirm password field.
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Handle form submission.
   */
  onSubmit(): void {
    // Reset error message
    console.log(this.token);
    
    this.errorMessage = '';

    // Validate form fields
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    console.log(this.password)
    // Call the API to update the password
    this.authService.updatePassword({ token: this.token, password: this.password }).subscribe(
      () => {
        // On success, show a success message and redirect to login
        this.snackbarService.success('Password reset successful! Please log in.');
        this.router.navigate(['/auth']);
      },
      (error) => {
        // On error, display an error message
        this.errorMessage = 'Failed to reset password. Please try again.';
        console.error('Error:', error);
      }
    );
  }
}