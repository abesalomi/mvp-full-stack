import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {
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
    const payload = {...user};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUser(userId: number) {
    const user = await this.userService.findById(userId);

    if(!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      roles: user.roles
    };
  }
}
