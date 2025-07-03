import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Category, Template } from '../../../models/template.model';
import {
  heroPencilSquareSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { TemplateService } from './templates.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [NgIcon, CommonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css',
  viewProviders: [provideIcons({ heroTrashSolid, heroPencilSquareSolid })],
})
export class TemplatesComponent implements OnInit {
  templates: Template[] = [];
  constructor(private templateSv: TemplateService) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.templateSv.getTemplates().subscribe({
      next: (data) => (this.templates = data),
      error: (error) => console.error('Error al cargar las plantillas', error),
    });
  }

  updateTemplate(id: number): void {
    const current = this.templates.find((t) => t.id === id);
    if (!current) return;

    const newName = prompt('Nuevo nombre:', current.name);
    const newSubject = prompt('Nuevo asunto:', current.subject);
    const newHtml = prompt('Nuevo HTML:', current.html);
    const newCategoryInput = prompt('Nueva categoría:', current.category);

    const allowedCategories: Category[] = [
      'promocion',
      'newsletter',
      'bienvenida',
    ];
    const newCategory = allowedCategories.includes(newCategoryInput as Category)
      ? (newCategoryInput as Category)
      : current.category;

    const updatedData: Partial<Template> = {
      name: newName ?? current.name,
      subject: newSubject ?? current.subject,
      category: newCategory,
      html: newHtml ?? current.html,
    };

    this.templateSv.updateTemplate(id, updatedData).subscribe({
      next: (res) => {
        const updatedTemplate = res.template;
        const index = this.templates.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.templates[index] = {
            ...this.templates[index],
            ...updatedTemplate,
          };
        }
      },
      error: (err) => console.error('Error al actualizar plantilla', err),
    });
  }

  deleteTemplate(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta plantilla?')) return;
    this.templateSv.deleteTemplate(id).subscribe({
      next: () => {
        // Actualizamos la lista despues de borrar
        this.templates = this.templates.filter((t) => t.id !== id);
      },
      error: (error) => console.log('Error al eliminar la plantilla', error),
    });
  }
}
