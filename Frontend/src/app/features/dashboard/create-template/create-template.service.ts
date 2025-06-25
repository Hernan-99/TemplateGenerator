import { Injectable } from '@angular/core';
import { TemplateApiService } from '../services/template-api.service';
import { Template } from '../models/template';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateTemplateService {
  constructor(private apiTemplate: TemplateApiService) {}

  saveTemplate(template: Template): Observable<{ message: string }> {
    return this.apiTemplate.createTemplate(template);
  }
}
