import { AuthRole } from './auth';

export interface RegisterRequest {
  username: string;
  password: string;
  roles: AuthRole[]
}

export interface RegisterResponse {
}
