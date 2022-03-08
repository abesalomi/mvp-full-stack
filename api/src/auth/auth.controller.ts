import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService) {}


  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/active-sessions')
  getActiveSession(@Request() req) {
    return this.authService.getActiveSession(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Request() req) {
    return this.authService.invalidateSession(req.user.sessionId)
  }
  @UseGuards(JwtAuthGuard)
  @Post('/logout-all')
  invalidateAllExcept(@Request() req) {
    return this.authService.invalidateAllExcept(req.user.id, req.user.sessionId)
  }

}
