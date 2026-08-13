import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

// Custom validator for email format
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(control.value) ? null : { invalidEmail: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the login form with validators
   */
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Check if a field has an error
   */
  hasError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return `${this.formatFieldName(fieldName)} is required`;
    }

    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `${this.formatFieldName(fieldName)} must be at least ${minLength} characters`;
    }

    if (control.hasError('invalidEmail')) {
      return 'Please enter a valid email address';
    }

    return '';
  }

  /**
   * Format field name for display
   */
  private formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Handle form submission - Simulated login
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // Prepare form data
    const formData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    // Log form data for testing (will be replaced with API call)
    console.log('Login Form Data:', formData);

    // Simulate API call with a timeout
    setTimeout(() => {
      this.loading = false;

      // Simulated successful login
      // In a real app, this would validate credentials against the backend
      // and the token below would be the JWT returned by that call.
      this.authService.login('dummy-simulated-token');
      this.successMessage = 'Login successful! Redirecting to dashboard...';

      // Optionally log success
      console.log('Login successful!');

      // Reset form
      this.loginForm.reset();
      this.submitted = false;

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);

      // For API integration, replace the setTimeout with actual HTTP call:
      // this.authService.login(formData).subscribe(
      //   (response) => {
      //     this.loading = false;
      //     this.successMessage = 'Login successful! Redirecting to dashboard...';
      //     localStorage.setItem('auth_token', response.token);
      //     this.loginForm.reset();
      //     this.submitted = false;
      //     setTimeout(() => {
      //       this.router.navigate(['/dashboard']);
      //     }, 2000);
      //   },
      //   (error) => {
      //     this.loading = false;
      //     this.errorMessage = error.error?.message || 'Invalid email or password';
      //   }
      // );
    }, 1500);
  }

  /**
   * Navigate to signup page
   */
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
