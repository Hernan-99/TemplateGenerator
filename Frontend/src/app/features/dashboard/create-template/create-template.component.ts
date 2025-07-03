import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateTemplateService } from './create-template.service';

declare const unlayer: any;

@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css',
})
export class CreateTemplateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private createTemplateSv = inject(CreateTemplateService);
  templateForm!: FormGroup;
  unlayerLoaded = false;

  constructor() {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      category: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  async ngOnInit() {
    try {
      await this.loadUnlayerScript();
      this.unlayerLoaded = true;

      unlayer.init({
        id: 'editor',
        displayMode: 'email',
      });
      console.log('Unlayer inicializado correctamente');
    } catch (error) {
      console.error('Error al cargar Unlayer:', error);
    }
  }

  loadUnlayerScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).unlayer) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://editor.unlayer.com/embed.js';
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  onSaveTemplate() {
    if (this.templateForm.invalid) {
      this.templateForm.markAllAsTouched();
      console.log('Formulario inválido', this.templateForm.value);
      return;
    }

    if (!this.unlayerLoaded) {
      console.error('Unlayer no está cargado todavía');
      return;
    }

    unlayer.exportHtml(
      (data: any) => {
        if (!data || !data.html) {
          console.error('No se pudo exportar el HTML de Unlayer');
          return;
        }

        const finalTemplate = {
          ...this.templateForm.value,
          html: data.html,
        };

        console.log('Template a guardar:', finalTemplate);
        //  POST a la API
        this.createTemplateSv.saveTemplate(finalTemplate).subscribe({
          next: (res) => {
            console.log('Template guardado con éxito', res);
            alert('Template guradado');
          },
          error: (err) => {
            console.error('Error al guardar template', err);
            alert('Error al guardar template');
          },
        });
      },
      (err: any) => {
        console.error('Error al exportar HTML:', err);
      }
    );
  }

  downloadTemplate() {
    if (!this.unlayerLoaded) {
      console.error('Unlayer no está cargado todavía');
      return;
    }

    unlayer.exportHtml((data: any) => {
      if (!data || !data.html) {
        console.error('No se pudo exportar el HTML de Unlayer');
        return;
      }

      const blob = new Blob([data.html], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = `${this.templateForm.get('name')?.value || 'template'}.html`;
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }
}
