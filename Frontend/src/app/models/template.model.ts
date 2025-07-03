export interface Template {
  id: number;
  name: string;
  subject: string;
  category: Category;
  message: string;
  html: string;
  createdAt: string;
}

export type Category = 'promocion' | 'newsletter' | 'bienvenida';
