import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { AuthResponse, LoginRequest } from '../../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authApi = inject(AuthApiService);

  login(email: string, password: string): Observable<AuthResponse> {
    const credentials: LoginRequest = { email, password };
    return this.authApi.login(credentials);
  }
}
