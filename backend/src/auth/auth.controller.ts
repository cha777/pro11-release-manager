import {
  Body,
  Controller,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session) {
    const { email, password: apiToken } = loginDto;
    const userDetails = await this.authService.validateUser(email, apiToken);

    if (!userDetails) {
      throw new UnauthorizedException();
    }

    session.user = { email, apiToken };

    return userDetails;
  }

  @Post('me')
  async verify(@Session() session: any) {
    const user = session.user;

    if (!user || !user.email || !user.apiToken) {
      throw new UnauthorizedException();
    }

    const userDetails = await this.authService.validateUser(
      user.email,
      user.apiToken,
    );

    if (!userDetails) {
      throw new UnauthorizedException();
    }

    return userDetails;
  }

  @Post('logout')
  logout(@Session() session: any) {
    session.destroy();
    return { message: 'Logout successful' };
  }
}
