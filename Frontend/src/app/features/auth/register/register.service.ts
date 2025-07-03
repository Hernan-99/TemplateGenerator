import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private authApi = inject(AuthApiService);

  register(user: RegisterRequest): Observable<{ message: string }> {
    return this.authApi.register(user);
  }
}
