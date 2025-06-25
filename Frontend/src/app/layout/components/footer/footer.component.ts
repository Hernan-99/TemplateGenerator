import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  viewProviders: [provideIcons({ heroEnvelopeSolid })],
})
export class FooterComponent {}
