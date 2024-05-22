import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import PrismaExceptionFilter from 'src/filters/PrismaException.filter';

@Controller('auth')
@UseFilters(PrismaExceptionFilter)
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('signup')
  async signup(@Body() credentials: SignupDto) {
    return this.authService.signup(credentials);
  }

}
