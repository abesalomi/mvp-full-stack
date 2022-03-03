import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const matched = await bcrypt.compare(password, user.password);
    if (user && matched) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {username: user.username, userId: user.id, roles: user.roles};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
