export interface LoginForm {
  email: string | null;
  password: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  [key: string]: any;
}

export interface ValidationErrors {
  email?: string[];
  password?: string[];
  [field: string]: string[] | undefined;
}
