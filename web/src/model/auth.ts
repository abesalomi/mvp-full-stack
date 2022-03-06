
export type AuthRole = 'SELLER' | 'BUYER';

export interface AuthUser {
  id: number;
  username: string;
  roles: AuthRole[];
}
