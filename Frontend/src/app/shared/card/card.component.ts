import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
