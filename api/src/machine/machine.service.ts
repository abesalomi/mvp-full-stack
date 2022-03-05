import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { User } from '../user/user.entity';
import { BuyRequestDao } from '../product/dao/buy-request.dao';
import { BuyResponseDao } from '../product/dao/buy-response.dao';
import { Product } from '../product/product.entity';

@Injectable()
export class MachineService {


  async deposit(amount: number, id: number) {
    return await getManager().transaction(async manager => {
      const user = await manager.findOne(User, id);
      user.deposit += amount;
      return await manager.save(user);
    });
  }

  async reset(id: number) {
    return await getManager().transaction(async manager => {
      const user = await manager.findOne(User, id);
      user.deposit = 0;
      return await manager.save(user);
    });
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
