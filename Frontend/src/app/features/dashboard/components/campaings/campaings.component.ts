import { Component, OnInit } from '@angular/core';
import { Template } from '../../../../models/template.model';
import { TemplateApiService } from '../../services/template-api.service';

@Component({
  selector: 'app-campaings',
  standalone: true,
  imports: [],
  templateUrl: './campaings.component.html',
  styleUrl: './campaings.component.css',
})
export class CampaingsComponent implements OnInit {
  templates: Template[] = [];

  constructor(private templateService: TemplateApiService) {}

  ngOnInit(): void {
    this.templateService.getUserTemplates().subscribe({
      next: (data) => {
        this.templates = data;
      },
      error: (err) => {
        console.error('Error al cargar las plantillas', err);
      },
    });
  }
}
