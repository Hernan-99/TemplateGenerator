import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from '../models/template';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateApiService {
  private readonly baseUrl = 'http://localhost:8080'; // tu backend

  constructor(private http: HttpClient) {}

  createTemplate(template: Template): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/templates`,
      template
    );
  }
  // Podés agregar luego: getTemplates(), getById(), update(), delete(), etc.

  getUserTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates`);
  }

  getTemplate(id: number): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.baseUrl}/templates/${id}`);
  }

  updateTemplate(
    id: number,
    updateTemp: Partial<Template>
  ): Observable<{ message: string; template: Template }> { // si el backend responde así
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
