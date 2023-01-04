import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './accounts.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountsModel: typeof Account,
  ) {}

  async findById(id: number): Promise<Account> {
    const account: Account = await this.accountsModel.findOne({
      where: { id },
    });
    return account.dataValues;
  }

  async findByName(name: string): Promise<Account> {
    const account: Account = await this.accountsModel.findOne({
      where: { name },
    });
    return account.dataValues;
  }

  async create(account: CreateAccountDto): Promise<Account> {
    try {
      return await this.accountsModel.create({ ...account });
    } catch (err) {
      return null;
    }
  }
}
