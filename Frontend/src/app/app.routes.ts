import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './features/auth/guard/auth.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: MainComponent, // Aquí va el layout con header/footer
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing.component').then(
            (c) => c.LandingComponent
          ),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./features/auth/login/login.component').then(
                (c) => c.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./features/auth/register/register.component').then(
                (c) => c.RegisterComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/dashboard/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './features/dashboard/create-template/create-template.component'
          ).then((c) => c.CreateTemplateComponent),
      },
      {
        path: 'templates',
        loadComponent: () =>
          import('./features/dashboard/templates/templates.component').then(
            (c) => c.TemplatesComponent
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./features/dashboard/account/account.component').then(
            (c) => c.AccountComponent
          ),
      },
      {
        path: 'help',
        loadComponent: () =>
          import('./features/dashboard/support/support.component').then(
            (c) => c.SupportComponent
          ),
      },
    ],
  },
  // fallback
  {
    path: '**',
    redirectTo: '',
  },
];
