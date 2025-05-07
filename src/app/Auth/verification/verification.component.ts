import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private router = inject(Router);
  private fb = inject(FormBuilder);

  verificationForm: FormGroup;
  verificationMessage = 'Verifying...';
  token: string | null = null;
  isVerified = false;

  constructor() {
    this.verificationForm = this.fb.group({
      token: ['', Validators.required], 
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];

      if (!this.token) {
        this.verificationMessage = 'Invalid verification link!';
      } else {
        this.verificationMessage = 'Please fill in your details to complete verification.';
        this.verificationForm.patchValue({ token: this.token }); 
      }
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      // this.authService.verifyToken(this.verificationForm.value).subscribe({
      //   next: (response: any) => {
      //     this.verificationMessage = response.message;
      //     this.isVerified = true;
      //     setTimeout(() => this.router.navigate(['/auth']), 3000);
      //   },
      //   error: () => {
      //     this.verificationMessage = 'Verification failed. Please try again.';
      //   }
      // });
    }
  }
}
