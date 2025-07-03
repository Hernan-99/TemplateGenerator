import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CardService } from './card.service';
import { Template } from '../../../../models/template.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() templates: Template[] = []; 
  @Input() icon: string = '';
  // templates: Template[] = [];
  // @Input() title: string = '';

  constructor(private cardSv: CardService) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.cardSv.getTemplate().subscribe({
      next: (data) => (this.templates = data),

      error: (error) => console.log('Error al obtener los datos', error),
    });
  }
}
