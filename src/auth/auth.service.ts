import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { Account } from '../accounts/accounts.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(name: string, password: string): Promise<any> {
    const account: Account = await this.accountsService.findByName(name);
    if (account && (await bcrypt.compare(password, account.password))) {
      const { password, ...user } = account;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
