
export type AuthRole = 'SELLER' | 'BUYER';

export interface AuthUser {
  id: number;
  username: string;
  roles: AuthRole[];
}


export interface UserSessions {
  sessionId: string;
  expiresAt: Date;
}

export interface ActiveSessionsResponse {
  count: number;
  sessions: UserSessions[]
}
