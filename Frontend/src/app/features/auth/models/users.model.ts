export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface Users {
  email: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  email: string;
}
