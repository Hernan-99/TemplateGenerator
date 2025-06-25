export interface Template {
  id: number;
  name: string;
  subject: string;
  category: Category;
  message: string;
  html: string;
}

export type Category = 'promocion' | 'newsletter' | 'bienvenida';
