import { Test, TestingModule } from '@nestjs/testing';
import { MachineController } from '../../src/machine/machine.controller';
import { User } from '../../src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../../src/user/role';
import * as request from 'supertest';
import { ExecutionContext, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../../src/auth/auth.service';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { getManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Product } from '../../src/product/product.entity';

const salt = bcrypt.genSaltSync(10);

type Products  = {
  expensive: Product;
  cheap: Product;
  outOfStock: Product;
}

describe('MachineController', () => {
  let app: INestApplication;
  let controller: MachineController;
  let auth: AuthService;
  let token: string;
  let user: User;
  let seller: User;
  let products: Products;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test']
        }),
        AppModule
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = user;
          return true
        },
      })
      .compile();


    controller = module.get<MachineController>(MachineController);
    auth = module.get<AuthService>(AuthService);



    token = (await auth.login(user)).access_token;

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  beforeEach(async () => {
    user = await getManager().save(User, {
      username: faker.internet.userName(),
      password: await bcrypt.hash(faker.internet.password(), salt),
      roles: [Role.BUYER],
    });

    seller = await getManager().save(User, {
      username: faker.internet.userName(),
      password: await bcrypt.hash(faker.internet.password(), salt),
      roles: [Role.SELLER],
    });

    products = {
      cheap: await getManager().save(Product, {
        productName: faker.name.firstName(),
        user: seller,
        cost: 10,
        amountAvailable: 20
      }),
      expensive: await getManager().save(Product, {
        productName: faker.name.firstName(),
        user: seller,
        cost: 1000,
        amountAvailable: 20
      }),
      outOfStock: await getManager().save(Product, {
        productName: faker.name.firstName(),
        user: seller,
        cost: 10,
        amountAvailable: 0
      }),
    }

  })

  afterEach( async () => {
    await getManager().delete(Product, Object.values(products));
    await getManager().delete(User, [user, seller]);
  })

  afterAll(() => {
    app.close();
  })


  it('Reset should set deposit 0', async function () {

    user.deposit = 325;
    await getManager().save(User, user);

    const response = await request(app.getHttpServer())
      .post('/machine/buy')
      .send({
        productId: products.cheap.id,
        amount: 2
      });

    const _user = await getManager().findOne(User, user.id);
    const _product = await getManager().findOne(Product, products.cheap.id);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body.deposit).toEqual(user.deposit - 2 * products.cheap.cost);
    expect(response.body.change).toEqual({ '5': 1, '10': 0, '20': 0, '50': 0, '100': 3 });

    expect(_user.deposit).toEqual(user.deposit - 2 * products.cheap.cost);
    expect(_product.amountAvailable).toEqual(products.cheap.amountAvailable - 2);

  });

  it('Reset should set deposit 0', async function () {

    user.deposit = 325;
    await getManager().save(User, user);

    const response = await request(app.getHttpServer())
      .post('/machine/buy')
      .send({
        productId: products.outOfStock.id,
        amount: 2
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('Not enough amount.');

  });


  it('Reset should set deposit 0', async function () {

    user.deposit = 325;
    await getManager().save(User, user);

    const response = await request(app.getHttpServer())
      .post('/machine/buy')
      .send({
        productId: products.expensive.id,
        amount: 2
      });

    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('Not enough deposit.');

  });


});
