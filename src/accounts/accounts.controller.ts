import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import * as bcrypt from 'bcrypt';
import { Account } from './accounts.model';
import { Public } from '../auth/auth.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Public()
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    const passHash = await bcrypt.hash(
      createAccountDto.password,
      parseInt(process.env.SALT_ROUNDS),
    );
    const { password, ...user } = createAccountDto;
    const account: Account = await this.accountsService.create({
      password: passHash,
      ...user,
    });
    if (!account) {
      throw new ConflictException('unable to create account');
    }
    return account;
  }
}
