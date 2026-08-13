import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Custom validator for password match
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) {
    return null;
  }

  const password = control.parent.get('password');
  const confirmPassword = control;

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

// Custom validator for email format
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(control.value) ? null : { invalidEmail: true };
}

// Password strength calculator with detailed criteria
interface PasswordCriteria {
  minLength: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
}

function calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password || password.length < 8) {
    return 'weak';
  }

  let strength = 0;

  // Check for lowercase letters
  if (/[a-z]/.test(password)) strength++;

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) strength++;

  // Check for numbers
  if (/\d/.test(password)) strength++;

  // Check for special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  // Check for length
  if (password.length >= 12) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
}

function getPasswordCriteria(password: string): PasswordCriteria {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password)
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  passwordCriteria: PasswordCriteria = {
    minLength: false,
    hasNumber: false,
    hasUppercase: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the signup form with validators
   */
  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator]]
    });
  }

  /**
   * Get form controls for template usage
   */
  get f() {
    return this.signupForm.controls;
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Update password strength indicator and criteria
   */
  updatePasswordStrength(): void {
    const password = this.signupForm.get('password')?.value || '';
    this.passwordStrength = calculatePasswordStrength(password);
    this.passwordCriteria = getPasswordCriteria(password);
  }

  /**
   * Get password strength color for UI
   */
  getPasswordStrengthColor(): string {
    switch (this.passwordStrength) {
      case 'weak':
        return '#ff4757';
      case 'medium':
        return '#ffa502';
      case 'strong':
        return '#2ed573';
      default:
        return '#dfe6e9';
    }
  }

  /**
   * Get password strength percentage
   */
  getPasswordStrengthPercent(): number {
    switch (this.passwordStrength) {
      case 'weak':
        return 33;
      case 'medium':
        return 66;
      case 'strong':
        return 100;
      default:
        return 0;
    }
  }

  /**
   * Check if confirm password matches
   */
  doesPasswordMatch(): boolean {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword;
  }

  /**
   * Check if a field has an error
   */
  hasError(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  /**
   * Get error message for a field
   */
  getErrorMessage(fieldName: string): string {
    const control = this.signupForm.get(fieldName);

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

    if (control.hasError('passwordMismatch')) {
      return 'Passwords do not match';
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
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Stop if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    // Prepare form data
    const formData = {
      fullName: this.signupForm.get('fullName')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    };

    // Log form data for testing (will be replaced with API call)
    console.log('Sign Up Form Data:', formData);

    // Simulate API call with a timeout
    setTimeout(() => {
      this.loading = false;

      // Simulated success response
      this.successMessage = 'Account created successfully! Redirecting to login...';

      // Optionally log success
      console.log('Account created successfully!');

      // Reset form
      this.signupForm.reset();
      this.submitted = false;
      this.passwordCriteria = { minLength: false, hasNumber: false, hasUppercase: false };
      this.passwordStrength = 'weak';

      // Redirect to login after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

      // For API integration, replace the setTimeout with actual HTTP call:
      // this.authService.signup(formData).subscribe(
      //   (response) => {
      //     this.loading = false;
      //     this.successMessage = 'Account created successfully! Redirecting to login...';
      //     this.signupForm.reset();
      //     this.submitted = false;
      //     setTimeout(() => {
      //       this.router.navigate(['/login']);
      //     }, 2000);
      //   },
      //   (error) => {
      //     this.loading = false;
      //     this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
      //   }
      // );
    }, 1500);
  }

  /**
   * Navigate to login page
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
