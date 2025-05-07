import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { ReverifcationModalComponent } from '../reverifcation-modal/reverifcation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ForgotPasswordModalComponent,ReverifcationModalComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  isSignUpMode = false;
  loginForm: FormGroup;
  signupForm: FormGroup;
  passwordMismatch = false;
  errorMessage = '';
  loading = false;
  showPassword = false;
  showForgotPasswordModal: boolean = false; 

  constructor(
    private router: Router, 
    private fb: FormBuilder,


  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.errorMessage = '';
    this.passwordMismatch = false;
    this.loginForm.reset();
    this.signupForm.reset();
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // this.authService.login(credentials).subscribe({
      //   next: (response) => {
      //     console.log('Login successful:', response);
      //     localStorage.setItem('token', response.token);
      //     const decoded: any = jwtDecode(response.token);
      //     const userid = decoded.userId; // Retrieve from local storage or auth service
      //     this.webSocketService.connect(userid);
      
      //     this.webSocketService.getMessages().subscribe((message) => {
      //     console.log('New message received:', message);
      //     });
      //     this.router.navigate(['/set-up']);
      //   },
      //   error: (error) => {
      //     console.error('Login failed:', error);
      //     this.errorMessage = error.error.message || 'Login failed. Please try again.';
      //     if (error.status == 403) {
      //       this.snackbarService.warning('You are not Verfied please verify your account first')
      //     }
      //     if (error.status == 400) {
      //       this.snackbarService.warning('Invalid credentials please verify your Email or Password')
      //     }
      //     this.loading = false;
      //   },
      //   complete: () => {
      //     this.loading = false;
      //   }
      // });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { password, confirmPassword } = this.signupForm.value;
      
      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;
      this.loading = true;
      this.errorMessage = '';

      const userData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      // this.authService.register(userData).subscribe({
      //   next: (response) => {
      //     console.log('Registration successful:', response);
      //     if (response.token) {
      //       localStorage.setItem('regtoken', response.token);
      //     }
      //     this.isSignUpMode = false;
      //   },
      //   error: (error) => {
      //     console.error('Registration failed:', error);
      //     this.errorMessage = error.error.message || 'Registration failed. Please try again.';
      //     this.loading = false;
      //   },
      //   complete: () => {
      //     this.loading = false;
      //     this.router.navigate(['/unverified']);
      //   }
      // });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  @ViewChild('forgotPasswordModal') forgotPasswordModal!: ForgotPasswordModalComponent;

  openForgotPasswordModal(): void {
    console.log('Forgot Password Clicked');
    this.forgotPasswordModal.openModal();
  }
  onModalClose(): void {
    this.showForgotPasswordModal = false;
  }

  @ViewChild('ReverifcationModal') reverificationModal!: ReverifcationModalComponent;

  openReverificationModal(): void {
    console.log('Reverification Modal Opened');
    this.reverificationModal.openModal();
  }

  closeReverificationModal(): void {
    console.log('Reverification Modal Closed');
    this.reverificationModal.closeModal();
  }
  
}