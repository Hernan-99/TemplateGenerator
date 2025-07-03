// app/models/auth.ts

import { User } from './user.model';

export interface RegisterRequest extends Omit<User, 'phone' | 'image'> {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
}
