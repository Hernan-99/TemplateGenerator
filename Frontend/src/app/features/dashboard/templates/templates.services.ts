import { Injectable } from '@angular/core';
import { TemplateApiService } from '../services/template-api.service';
import { Template } from '../../../models/template.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  templates: Template[] = [];
  constructor(private apiTemplate: TemplateApiService) {}

  getTemplates(): Observable<Template[]> {
    return this.apiTemplate.getUserTemplates();
  }

  updateTemplate(id: number, template: Partial<Template>) {
    return this.apiTemplate.updateTemplate(id, template);
  }

  deleteTemplate(id: number) {
    return this.apiTemplate.deleteTemplate(id);
  }
}
