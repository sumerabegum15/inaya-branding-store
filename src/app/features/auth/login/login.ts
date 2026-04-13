import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  // ── State
  activeTab = signal<'login' | 'signup'>('login');
  showPassword = signal(false);
  showConfirm = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  // ── Forms
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });

    this.signupForm = this.fb.group({
      name:     ['', [Validators.required, Validators.minLength(2)]],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // ── Tab switch
  switchTab(tab: 'login' | 'signup') {
    this.activeTab.set(tab);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.loginForm.reset();
    this.signupForm.reset();
  }

  // ── Password match validator
  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  // ── Getters for easy template access
  get lf() { return this.loginForm.controls; }
  get sf() { return this.signupForm.controls; }

  get isLogin() { return this.activeTab() === 'login'; }

  // ── Submit login
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Please fill in all fields correctly.');
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulate API call — replace with your AuthService call
    setTimeout(() => {
      this.isLoading.set(false);
      // ✅ On success: navigate to home
      this.router.navigate(['/home']);
      // ❌ On error: this.errorMessage.set('Invalid email or password.');
    }, 1500);
  }

  // ── Submit signup
  onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      if (this.signupForm.hasError('mismatch')) {
        this.errorMessage.set('Passwords do not match.');
      } else {
        this.errorMessage.set('Please fill in all fields correctly.');
      }
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulate API call — replace with your AuthService call
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Account created! Please sign in.');
      this.switchTab('login');
    }, 1500);
  }

  // ── Social login (wire up to your OAuth provider)
  onSocialLogin(provider: 'google' | 'facebook') {
    console.log(`Login with ${provider}`);
    // TODO: integrate your OAuth service here
  }

  // ── Forgot password
  onForgotPassword() {
    // TODO: navigate to forgot-password route or open modal
    console.log('Forgot password:', this.lf['email'].value);
  }

  // ── Field error helpers
  hasError(form: FormGroup, field: string, error: string): boolean {
    const ctrl = form.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }
}