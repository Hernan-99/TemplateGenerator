import { Injectable } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { AuthResponse, Users } from '../models/users.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authApi: AuthApiService) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.authApi.login({ email, password });
  }
}
