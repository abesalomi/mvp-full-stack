import { BadRequestException, Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { User } from '../user/user.entity';
import { BuyRequestDao } from './dao/buy-request.dao';
import { BuyResponseDao } from './dao/buy-response.dao';
import { Product } from '../product/product.entity';
import { calculateChange } from '../utils/change-calculator.util';

@Injectable()
export class MachineService {


  async addDeposit(amount: number, userId: number) {
    await getManager().transaction(async manager => {
      const user = await manager.findOne(User, userId);
      user.deposit += amount;
      return await manager.save(user);
    });

    return this.getDeposit(userId)
  }

  async reset(userId: number): Promise<ResetResponseDao> {
    const deposit =  await getManager().transaction(async manager => {
      const user = await manager.findOne(User, userId);
      const depositBeforeReset = user.deposit;
      user.deposit = 0;
      await manager.save(user);
      return depositBeforeReset;
    });
    return {
      deposit: 0,
      change: calculateChange(deposit),
      oldDeposit: deposit,
    };
  }

  async getDeposit(userId: number): Promise<DepositResponseDao> {
    return await getManager().transaction(async manager => {
      const user = await manager.findOne(User, userId);
      return {
        deposit: user.deposit,
      };
    });
  }

  async buy(userId: number, buyReq: BuyRequestDao): Promise<BuyResponseDao> {

    return await getManager().transaction(async manager => {
      const user = await manager.findOne(User, userId);
      const product = await manager.findOne(Product, buyReq.productId);
      const totalCharge = product.cost * buyReq.amount;

      if (!product) {
        throw new BadRequestException('Product does not exists.');
      }


      if (product.amountAvailable < buyReq.amount) {
        throw new BadRequestException('Not enough amount.');
      }

      if (user.deposit < totalCharge) {
        throw new BadRequestException('Not enough deposit.');
      }

      user.deposit -= totalCharge;
      product.amountAvailable -= buyReq.amount;

      await manager.save([user, product]);

      return {
        charged: totalCharge,
        deposit: user.deposit,
        change: calculateChange(user.deposit),
      };
    })
  }
}
