import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SessionService } from './session/session.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const matched = await bcrypt.compare(password, user?.password);

    if (matched) {
      const {password, ...result} = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const sessionId = uuidv4().toString();
    const payload = {...user, sessionId};
    const accessToken = this.jwtService.sign(payload);
    const decoded: any = this.jwtService.decode(accessToken);

    await this.sessionService.createSession({
      sessionId: sessionId,
      userId: user.id,
      isInvalid: false,
      expiresAt: new Date(decoded.exp * 1000),
    })

    return {
      access_token: accessToken,
    };
  }

  async getUser(userId: number, sessionId: string) {
    const user = await this.userService.findById(userId);
    const session = await this.sessionService.findById(sessionId);

    if (!user || !session || session.isInvalid) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      roles: user.roles,
      sessionId
    };
  }

  getActiveSession(userId: number) {
    return this.sessionService.findActiveSessionByUserId(userId);
  }

  invalidateAllExcept(userId: number, sessionId: string) {
    return this.sessionService.invalidateAllExcept(userId, sessionId)
  }

  invalidateSession(sessionId: string) {
    return this.sessionService.invalidateSessionById(sessionId);
  }
}
