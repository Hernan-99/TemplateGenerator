import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: (res) => {
        console.log('Login response:', res); // 👈 Agrega esto
        localStorage.setItem('accessToken', res.accessToken);
        // localStorage.setItem('email', res.email); // Aquí te llega undefined
        localStorage.setItem('email', email);
        this.router.navigate(['/dashboard/home']); // 👈 Usa dashboard/home, no solo /dashboard
      },
      error: (error: { message: string }) => {
        this.isLoading = false;
        this.errorMessage =
          error.message ||
          'Error al iniciar sesión. Por favor, intenta nuevamente.';
        console.error('Login error:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
