import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DepositDao } from './dao/deposit.dao';
import { UserUpdateDao } from './dao/user-update.dao';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from './role';

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

  @Put()
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

  @Post('/deposit')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UsePipes(new ValidationPipe({transform: true}))
  async deposit(@Body() deposit: DepositDao, @Request() req) {
    return this.userService.deposit(deposit.amount, req.user.id);
  }


}
