import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly baseUrl = 'http://localhost:8080'; // backend
  private http = inject(HttpClient);
  user = signal<User | null>(null);

  // cargar perfil (GET)
  loadProfile(): void {
    this.http.get<User>(`${this.baseUrl}/account`).subscribe({
      next: (data) => this.user.set(data),
      error: (err) => {
        console.log('Error: ', err);
        this.user.set(null);
      },
    });
  }

  // Actualizacion de perfil
  updateProfile(data: Partial<User>) {
    return this.http.patch<User>(`${this.baseUrl}/account`, data).pipe(
      // Actualizacion dell usuario en la signal
      tap((update) => this.user.set(update))
    );
  }

  deleteAccount(): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/account`)
      .pipe(tap(() => this.clearProfile()));
  }

  // Limpiar usuario
  clearProfile(): void {
    this.user.set(null);
  }
}
