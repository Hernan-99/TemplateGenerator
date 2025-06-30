import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
      heroArrowLeftOnRectangleSolid
    }),
  ],
})
export class SidebarComponent {
  isCollapsed = false;
  openMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
