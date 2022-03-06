import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ProductUpdateRequest } from './dao/product-update-request.dao';

@Injectable()
export class ProductService {

  constructor(
    @Inject('PRODUCT_REPOSITORY') private repository: Repository<Product>,
    private userService: UserService,
  ) {
  }

  async create(product: Product, {id}: User) {
    const count = await this.repository.count({
      where: {
        productName: product.productName
      }
    });

    if(count > 0) {
      throw new BadRequestException('Product name should be unique.');
    }

    const user = await this.userService.findById(id);
    return this.repository.save({
      ...product,
      user,
    });
  }

  async findAll(userId?: number) {

    if(userId) {
      return this.repository.find({
        where: {
          user: {
            id: userId
          }
        },
        order: {
          createdAt: 'DESC'
        }
      })
    }

    return this.repository.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }


  async delete(productId: number, userId: number) {
    const product = await this.repository.findOne({
      where: {
        id: productId,
        user: {
          id: userId,
        },
      },
    });

    if (!product) {
      throw new BadRequestException(`Bad request, product doesn't exist or it belongs to someone else.`)
    }

    return this.repository.delete(product.id);
  }

  async update(productId: number, productUpdate: ProductUpdateRequest, userId: number) {

    const product = await this.repository.findOne({
      where: {
        id: productId,
        user: {
          id: userId,
        },
      },
    });


    if (!product) {
      throw new BadRequestException(`Bad request, product doesn't exist or it belongs to someone else.`)
    }

    const count = await this.repository.count({
      where: {
        productName: productUpdate.productName,
      },
    });

    if(count > 0 && product.productName !== productUpdate.productName) {
      throw new BadRequestException('Product name should be unique.');
    }

    product.productName = productUpdate.productName;
    product.cost = productUpdate.cost;
    product.amountAvailable = productUpdate.amountAvailable;

    return this.repository.save(product);

  }

}
