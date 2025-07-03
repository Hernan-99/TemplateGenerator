import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../services/user-api.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userApi = inject(UsersApiService);

  // Signal
  get user() {
    return this.userApi.user;
  }

  loadProfile() {
    this.userApi.loadProfile();
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.userApi.updateProfile(data);
  }

  deleteAccount(): Observable<void> {
    return this.userApi.deleteAccount();
  }

  clearProfile() {
    this.userApi.clearProfile();
  }
}
