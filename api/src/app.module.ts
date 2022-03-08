import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MachineModule } from './machine/machine.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    MachineModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'web'),
    })
],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService
  ],
})
export class AppModule {}
