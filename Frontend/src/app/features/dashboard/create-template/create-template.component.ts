import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  templateForm!: FormGroup;
  unlayerLoaded = false;

  constructor(
    private fb: FormBuilder,
    private createTemplateService: CreateTemplateService
  ) {
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
        // aquí harías un POST a tu API
        this.createTemplateService.saveTemplate(finalTemplate).subscribe({
          next: (res) => {
            console.log('Template guardado con éxito', res);
            // Podés hacer un redirect o mostrar un mensaje
          },
          error: (err) => {
            console.error('Error al guardar template', err);
          },
        });
      },
      (err: any) => {
        console.error('Error al exportar HTML:', err);
      }
    );
  }
}
