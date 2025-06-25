import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
export const authGuard: CanActivateFn = (route, state) => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);
  const token = authApi.getAccessToken();

  console.log('Autenticando acceso', route, state);

  // No hay token o está vencido
  if (!token || authApi.isTokenExpired(token)) {
    authApi.clearTokens();
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};

/*
desde el navegador simulo el token:
localStorage.setItem('token', '123456'); <- lo creo
localStorage.removeItem('token'); <- lo borro

 */
