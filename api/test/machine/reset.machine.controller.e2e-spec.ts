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
import { getConnection, getManager } from 'typeorm';
import { faker } from '@faker-js/faker';

const salt = bcrypt.genSaltSync(10);

describe('MachineController', () => {
  let app: INestApplication;
  let controller: MachineController;
  let auth: AuthService;
  let user: User;

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

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  beforeEach(async () => {

    await getConnection().synchronize();

    user = await getManager().save(User, {
      username: faker.internet.userName(),
      password: await bcrypt.hash(faker.internet.password(), salt),
      roles: [Role.BUYER],
    });
  })

  afterEach( async () => {
    await getConnection().dropDatabase();
  })

  afterAll(() => {
    app.close();
  })


  it('Reset should set deposit 0', async function () {

    user.deposit = 325;
    await getManager().save(User, user);

    const response = await request(app.getHttpServer())
      .post('/machine/reset');

    const _user = await getManager().findOne(User, user.id);

    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body.deposit).toEqual(0);
    expect(response.body.change).toEqual({ '5': 1, '10': 0, '20': 1, '50': 0, '100': 3 });

    expect(_user.deposit).toEqual(0);

  });


});
