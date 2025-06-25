import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerSv: RegisterService,
    private router: Router
  ) {
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
    this.isLoading = true;
    this.errorMessage = null;

    const { firstname, lastname, email, password } = this.registerForm.value;
    this.registerSv.register(firstname, lastname, email, password).subscribe({
      next: (res) => {
        console.log('Register res: ', res);
        this.router.navigate(['/auth/login']);
      },
      error: (error: { message: string }) => {
        this.isLoading = false;
        this.errorMessage =
          error.message ||
          'Error al registrarse. Por favor, intenta nuevamente.';
        console.log('Register error: ', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
