import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../../../models/auth.model';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private registerSv = inject(RegisterService);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const user: RegisterRequest = this.registerForm.value;

    this.registerSv.register(user).subscribe({
      next: (res) => {
        console.log('Register res: ', res);
        this.router.navigate(['/auth/login']);
      },
      error: (error: { message: string }) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          error.message ||
            'Error al registrarse. Por favor, intenta nuevamente.'
        );
        console.log('Register error: ', error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
