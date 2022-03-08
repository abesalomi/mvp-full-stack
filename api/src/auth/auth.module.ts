import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { sessionProviders } from './session/sessionProviders';
import { SessionService } from './session/session.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'},
    }),
  ],
  providers: [AuthService, SessionService, LocalStrategy, JwtStrategy, ...sessionProviders],
  controllers: [AuthController],
})
export class AuthModule {
}
