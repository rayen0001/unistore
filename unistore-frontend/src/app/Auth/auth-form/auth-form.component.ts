import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { ReverifcationModalComponent } from '../reverifcation-modal/reverifcation-modal.component';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { SnackbarService } from '../../services/snackbar.service';
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
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private webSocketService: WebSocketService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login (e.g., store token, redirect)
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', response.username);
          //const userToken = response.token; // Retrieve from local storage or auth service
         // this.webSocketService.connect(userToken);
      
          //this.webSocketService.getMessages().subscribe((message) => {
          //console.log('New message received:', message);
         // });
          this.router.navigate(['/']);
        },
        error: (error) => {
        this.snackbarService.error(error.error.message)
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
    else{this.snackbarService.warning("Form is not valid")}
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
       name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      console.log(this.signupForm);
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Handle successful registration
          if (response.token) {
            localStorage.setItem('regtoken', response.token);

          }
          // Optional: switch to login mode
          this.isSignUpMode = false;
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.router.navigate(['/unverified']);
        }
      });
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