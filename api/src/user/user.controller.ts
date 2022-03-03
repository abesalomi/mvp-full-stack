import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  finsAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }
}
