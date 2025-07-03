import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeftOnRectangleSolid,
  heroBars4Solid,
  heroBookmarkSolid,
  heroCog6ToothSolid,
  heroEnvelopeOpenSolid,
  heroEnvelopeSolid,
  heroLifebuoySolid,
  heroPlusCircleSolid,
  heroPresentationChartBarSolid,
  heroQuestionMarkCircleSolid,
  heroQueueListSolid,
  heroUserCircleSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { SidebarService } from './sidebar.service';
import { UsersApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIcon, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  viewProviders: [
    provideIcons({
      heroEnvelopeSolid,
      heroBars4Solid,
      heroLifebuoySolid,
      heroPlusCircleSolid,
      heroQueueListSolid,
      heroPresentationChartBarSolid,
      heroCog6ToothSolid,
      heroQuestionMarkCircleSolid,
      heroEnvelopeOpenSolid,
      heroUserCircleSolid,
      heroXMarkSolid,
      heroBookmarkSolid,
      heroArrowLeftOnRectangleSolid,
    }),
  ],
})
export class SidebarComponent implements OnInit {
  private authApi = inject(AuthApiService);
  private sidebarSv = inject(SidebarService);
  private router = inject(Router);
  private usersApi = inject(UsersApiService);
  isCollapsed: boolean = false;

  ngOnInit(): void {
    this.usersApi.loadProfile(); // carga del perfil
  }

  readonly user = this.sidebarSv.user; // signal<User | null> viene desde  user-api.service

  openMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authApi.logout().subscribe({
      next: () => {
        this.authApi.clearTokens();
        localStorage.removeItem('email');
        this.usersApi.clearProfile();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Error en logout:', err);
        this.authApi.clearTokens();
        this.usersApi.clearProfile();
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
