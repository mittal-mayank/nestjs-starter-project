import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
    });
  }

  async validate(name: string, password: string): Promise<any> {
    const user = await this.authService.validateAccount(
      name,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('name or password does not match');
    }
    return user;
  }
}
