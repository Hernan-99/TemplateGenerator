import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Template } from '../../../models/template.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateApiService {
  private readonly baseUrl = 'http://localhost:8080'; // backend
  private http = inject(HttpClient);

  createTemplate(template: Template): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/templates`,
      template
    );
  }

  getUserTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates`);
  }

  getTemplate(id: number): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates/${id}`);
  }

  updateTemplate(
    id: number,
    updateTemp: Partial<Template>
  ): Observable<{ message: string; template: Template }> {
    return this.http.put<{ message: string; template: Template }>(
      `${this.baseUrl}/templates/${id}`,
      updateTemp
    );
  }

  deleteTemplate(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/templates/${id}`
    );
  }
}
