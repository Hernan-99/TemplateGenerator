import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service';
import { AuthApiService } from '../../auth/services/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private fb = inject(FormBuilder);
  private accountSv = inject(AccountService);
  private router = inject(Router);
  private authApi = inject(AuthApiService);

  form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      image: [''],
      password: [''],
    });

    // Cargar inicial del perfil
    this.accountSv.loadProfile();

    effect(() => {
      const user = this.accountSv.user();
      if (user) {
        this.form.patchValue(user);
      }
    });
  }

  handleSubmit(): void {
    const formData = this.form.value;
    this.accountSv.updateProfile(formData).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente');
      },
      error: () => alert('Error al actualizar'),
    });
  }

  deleteAccount(): void {
    if (
      confirm(
        '¿Estás seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.'
      )
    ) {
      this.accountSv.deleteAccount().subscribe({
        next: () => {
          alert('Cuenta eliminada correctamente.');
          // Limpieza de tokens
          this.authApi.clearTokens();

          // Limpieza del perfil local
          this.accountSv.clearProfile();

          // Redireccionamiento
          this.router.navigate(['/auth/login']);
        },
        error: () => alert('Error al eliminar la cuenta. Intenta nuevamente.'),
      });
    }
  }
}
