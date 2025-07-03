import { Injectable } from '@angular/core';
import { Template } from '../../../../models/template.model';
import { TemplateApiService } from '../../services/template-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  templates: Template[] = [];

  constructor(private temApi: TemplateApiService) {}

  getTemplate(): Observable<Template[]> {
    return this.temApi.getUserTemplates();
  }
}
