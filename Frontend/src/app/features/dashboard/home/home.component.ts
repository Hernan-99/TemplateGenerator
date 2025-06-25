import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { CampaingsComponent } from '../components/campaings/campaings.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CardComponent, CampaingsComponent, HeaderComponent],
})
export class HomeComponent {}
