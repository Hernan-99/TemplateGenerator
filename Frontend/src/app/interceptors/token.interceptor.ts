import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthApiService } from '../features/auth/services/auth-api.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);

  const token = authApi.getAccessToken();

  // No interceptar login ni refresh
  if (req.url.includes('/auth') && !req.url.includes('/protected')) {
    return next(req);
  }

  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = authApi.getRefreshToken();

        if (!refreshToken) {
          authApi.clearTokens();
          router.navigate(['/auth/login']);
          return throwError(() => error);
        }

        return authApi.refreshToken().pipe(
          switchMap((res) => {
            authApi.setAccessToken(res.accessToken);

            const retryReq = req.clone({
              headers: req.headers.set(
                'Authorization',
                `Bearer ${res.accessToken}`
              ),
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            authApi.clearTokens();
            router.navigate(['/auth/login']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
