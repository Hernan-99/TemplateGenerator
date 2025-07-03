import { inject, Injectable } from '@angular/core';
import { UsersApiService } from '../../services/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // inject de  UsersApiService para acceder a su signal
  private userApi = inject(UsersApiService);

  // signal del service
  readonly user = this.userApi.user;
}
