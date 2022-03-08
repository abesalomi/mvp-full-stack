import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BuyRequestDao } from './dao/buy-request.dao';
import { DepositDao } from './dao/deposit.dao';

@Controller('/machine')
export class MachineController {

  constructor(private readonly service: MachineService) {
  }


  @HttpCode(200)
  @Post('/buy')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async buy(@Body() buyReq: BuyRequestDao, @Request() req) {
    return this.service.buy(req.user.id, buyReq);
  }


  @Get('/deposit')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getDeposit(@Request() req) {
    return this.service.getDeposit(req.user.id);
  }



  @HttpCode(200)
  @Post('/deposit')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deposit(@Body() deposit: DepositDao, @Request() req) {
    return this.service.addDeposit(deposit.deposit, req.user.id);
  }


  @HttpCode(200)
  @Post('/reset')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async reset(@Request() req) {
    return this.service.reset(req.user.id);
  }

}
