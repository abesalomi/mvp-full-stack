import { http } from './http';
import { LoginCredentials, LoginResponse } from '../model/login';
import { AuthUser } from '../model/auth';
import { RegisterRequest, RegisterResponse } from '../model/register';

export const httpLogin = (loginRequest: LoginCredentials) => http.post<LoginResponse>('/auth/login', loginRequest)
  .then(({data}) => data);

export const httpGetUser = () => http.get<AuthUser>('/auth/profile')
  .then(({data}) => data);

export const httpRegister = (registerRequest: RegisterRequest) => http.post<RegisterResponse>('/users', registerRequest)
  .then(({data}) => data);
