import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BuyRequestDao } from '../product/dao/buy-request.dao';
import { DepositDao } from '../user/dao/deposit.dao';

@Controller('/machine')
export class MachineController {

  constructor(private readonly service: MachineService) {
  }


  @Post('/buy')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async buy(@Body() buyReq: BuyRequestDao, @Request() req) {
    return this.service.buy(req.user.id, buyReq);
  }


  @Post('/deposit')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deposit(@Body() deposit: DepositDao, @Request() req) {
    return this.service.deposit(deposit.amount, req.user.id);
  }


  @Post('/reset')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async reset(@Request() req) {
    return this.service.reset(req.user.id);
  }


}
