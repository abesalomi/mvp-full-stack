import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/role';
import { ProductUpdateRequest } from './dao/product-update-request.dao';

@Controller('/products')
export class ProductController {

  constructor(private readonly service: ProductService) {
  }

  @Get()
  @Roles(Role.SELLER, Role.BUYER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Query() query) {
    return this.service.findAll(query.userId);
  }

  @Post()
  @Roles(Role.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() product: Product, @Request() req) {
    return await this.service.create(product, req.user);
  }

  @Delete('/:productId')
  @Roles(Role.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('productId') productId: number, @Request() req) {
    return await this.service.delete(productId, req.user.id);
  }

  @Put('/:productId')
  @Roles(Role.SELLER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async edit(@Param('productId') productId: number,@Body() productUpdate: ProductUpdateRequest, @Request() req) {
    return await this.service.update(productId, productUpdate, req.user.id);
  }


}
