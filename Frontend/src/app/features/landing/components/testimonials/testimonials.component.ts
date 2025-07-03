import { AfterViewInit, Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements AfterViewInit {
  @Input() icon: string = '';
  @Input() testimonial: string = '';
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() description: string = '';

  ngAfterViewInit(): void {
    ScrollReveal().reveal('.card', {
      origin: 'top',
      distance: '100px',
      duration: 1200,
      interval: 300, // itervalo para que caigan las cards de a una
    });
  }
}
