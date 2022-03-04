import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/role';
import { BuyRequestDao } from './dao/buy-request.dao';

@Controller('/products')
export class ProductController {

  constructor(private readonly service: ProductService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles(Role.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() product: Product, @Request() req) {
    return await this.service.create(product, req.user);
  }

  @Post('/buy')
  @Roles(Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async buy(@Body() buyReq: BuyRequestDao, @Request() req) {
    return this.service.buy(req.user.id, buyReq);
  }

}
