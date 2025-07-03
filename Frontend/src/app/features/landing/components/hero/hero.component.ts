import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import ScrollReveal from 'scrollreveal';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit() {
    ScrollReveal().reveal('.fade', {
      distance: '50px',
      duration: 800,
      easing: 'ease-in-out',
      origin: 'bottom',
      reset: false,
    });
  }
}
