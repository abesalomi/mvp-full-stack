import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param, Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserUpdateDao } from './dao/user-update.dao';

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

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateDao: UserUpdateDao, @Request() req) {
    return this.userService.update(req.user.id, updateDao);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard)
  delete(@Param('userId') userId: number, @Request() req) {
    if (userId !== req.user.id) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN
      }, HttpStatus.FORBIDDEN);
    }

    return this.userService.delete(userId);
  }


}
