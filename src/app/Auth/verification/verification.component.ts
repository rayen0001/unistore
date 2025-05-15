import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  verificationForm: FormGroup;
  verificationMessage = 'Verifying...';
  token: string | null = null;
  isVerified = false;

  constructor(private snackbar:SnackbarService) {
    this.verificationForm = this.fb.group({
      token: ['', Validators.required], // Ensure token is included
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      language: ['', [Validators.required]],
      bio: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

      if (!this.token) {
        this.verificationMessage = 'Invalid verification link!';
      } else {
        this.verificationMessage = 'Please fill in your details to complete verification.';
        this.verificationForm.patchValue({ token: this.token }); // Inject the token into the form
      }
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      this.authService.verifyToken(this.verificationForm.value).subscribe({
        next: (response: any) => {
        
          this.isVerified = true;
          this.snackbar.success(response)
          setTimeout(() => this.router.navigate(['/auth']), 3000);
        },
        error: (err) => {
          console.log(err);
          
          this.verificationMessage = 'Verification failed. Please try again.';
        }
      });
    }
  }
}