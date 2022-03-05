import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {

  constructor(
    @Inject('PRODUCT_REPOSITORY') private repository: Repository<Product>,
    private userService: UserService,
  ) {
  }

  async create(product: Product, {id}: User) {
    const user = await this.userService.findById(id);
    return this.repository.save({
      ...product,
      user,
    });
  }

  async findAll() {
    return this.repository.find();
  }


}
