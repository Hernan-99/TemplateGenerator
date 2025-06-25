import { Injectable } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private authApi: AuthApiService) {}

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<{ message: string }> {
    const user = { firstname, lastname, email, password };
    return this.authApi.register(user);
  }
}
