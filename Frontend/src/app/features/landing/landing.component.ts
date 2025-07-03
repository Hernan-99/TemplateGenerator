import { Component, AfterViewInit } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CardComponent } from './components/card/card.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { provideIcons } from '@ng-icons/core';
import ScrollReveal from 'scrollreveal';

import {
  heroArrowTrendingUpSolid,
  heroDevicePhoneMobileSolid,
  heroPaintBrushSolid,
  heroStarSolid,
} from '@ng-icons/heroicons/solid';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    CardComponent,
    JumbotronComponent,
    TestimonialsComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  viewProviders: [
    provideIcons({
      heroPaintBrushSolid,
      heroDevicePhoneMobileSolid,
      heroArrowTrendingUpSolid,
      heroStarSolid,
    }),
  ],
})
export class LandingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    ScrollReveal().reveal('.from-top', {
      origin: 'top',
      distance: '100px',
      duration: 1200,
    });
  }
}
