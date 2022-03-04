import { Inject, Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { BuyRequestDao } from './dao/buy-request.dao';
import { BuyResponseDao } from './dao/buy-response.dao';

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

  async buy(userId: number, buyReq: BuyRequestDao): Promise<BuyResponseDao> {
    return await getManager().transaction(async manager => {
      const user = await manager.findOne(User, userId);
      const product = await manager.findOne(Product, buyReq.productId);
      const totalCharge = product.cost * buyReq.amount;

      if (!product) {
        return {
          success: false,
          message: 'Product does not exists.',
        }
      }


      if (product.amountAvailable < buyReq.amount) {
        return {
          success: false,
          message: 'Not enough amount.',
        }
      }

      if (user.deposit < totalCharge) {
        return {
          success: false,
          message: 'Not enough deposit.',
        }
      }

      user.deposit -= totalCharge;
      product.amountAvailable -= buyReq.amount;

      await manager.save([user, product]);

      return {
        success: true,
      };
    })
  }
}
